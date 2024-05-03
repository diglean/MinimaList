<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\CreateListItemData;
use Domain\ListItem\Models\ListItem;
use Domain\List\Models\Lists;
use Illuminate\Support\Carbon;

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

        for ($i = 0; $i < $data->qty; $i++) {
            $total += (float) $data->price;
        }

        $listItem = $this->listItem->create([
            'list_id' => $data->list_id,
            'name' => $data->name,
            'price' => floatval($data->price),
            'unit' => $data->unit,
            'qty' => $data->qty,
            'total' => floatval($total),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $list = $this->listModel->whereId($data->list_id)->first();
        $list->update([
            'items_qty' => $list->items_qty + $data->qty,
            'items_total' => $list->total + $total,
        ]);

        /**
		 * Collection of list items that will be sended to frontend.
		 */
        $listItems = $this->listItem->whereId($data->list_id)->get();

        $itemsTotal = $this->listModel->whereId($data->list_id)->get('items_total')->items_total;

        return [
            'id' => $listItem->id,
            'items_total' => $itemsTotal,
            'items' => $listItems,
        ];
    }
}
