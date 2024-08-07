<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\CreateListItemData;
use App\Context\ListItem\Types\ListItemActiveType;
use Domain\ListItem\Models\ListItem;
use Domain\List\Models\Lists;
use Illuminate\Support\Carbon;
use Library\Parsers\Money;

class CreateListItemAction
{
    public function __construct(
      public ListItem $listItem,
      public Lists $listModel,
    ) {
    }

    /**
     * Executes the action to create list items.
     *
     * @param CreateListItemData $data The data for creating the list items.
     * @return array The created list items.
     */
    public function execute(CreateListItemData $data): array
    {   
        $total = 0;
        $formattedValue = null;

        if ($data->price) {
            for ($i = 0; $i < $data->qty; $i++) {
                $formattedValue = str_replace('.', '', $data->price);
                $formattedValue = str_replace(',', '.', $formattedValue);
    
                $total += $formattedValue;
            }
        }

        $listItem = $this->listItem->create([
            'list_id' => $data->list_id,
            'name' => $data->name,
            'price' => $formattedValue ?? "0.00",
            'qty' => $data->qty,
            'total' => $total,
            'unit' => $data->unit,
            'category_id' => $data->category_id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $list = $this->listModel->whereId($data->list_id)->first();
        $list->update([
            'items_qty' => $list->items_qty + $data->qty,
            'items_total' => $list->items_total + $total,
        ]);

        /**
		 * Collection of list items that will be sended to frontend.
		 */
        $listItems = $this->listItem
            ->whereListId($data->list_id)
            ->whereActive(ListItemActiveType::Yes)
            ->get();

        $itemsTotal = $this->listModel->whereId($data->list_id)->get('items_total');

        return [
            'id' => $listItem->id,
            'items_total' => $itemsTotal,
            'items' => $listItems,
        ];
    }
}
