<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\CreateListItemsData;
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
     * @param CreateListItemsData $data The data for creating the list items.
     * @return array The created list items.
     */
    public function execute(CreateListItemsData $data): array
    {
        $listItem = $this->listItem->create([
            'list_id' => $data->list_id,
            'name' => $data->name,
            'price' => floatval($data->price),
            'unity' => $data->unity,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $list = $this->listModel->whereId($data->list_id)->first();
        $list->update(['items_qty' => $list->items_qty + 1]);

        $listItems = $this->listItem
            ->whereId($data->list_id)
            ->get();

        return [
            'id' => $listItem->id,
            'items' => $listItems,
        ];
    }
}
