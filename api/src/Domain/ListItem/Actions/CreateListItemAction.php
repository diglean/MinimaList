<?php

namespace Domain\ListItem\Actions;

use App\Context\List\DataTransferObject\CreateListItemsData;
use Domain\ListItem\Models\ListItem;
use Domain\List\Models\Lists;
use Illuminate\Support\Carbon;

class CreateListItemAction
{
    public function __construct(
      public ListItem $listItem,
      public Lists $list,
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
        $listItems = $this->listItem->create([
            'list_id' => $data->list_id,
            'items' => json_encode($data->items),
            'comment' => $data->comment,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $this->list->whereId($data->list_id)->update([
            'items_id' => $listItems->id,
            'items_qty' => count($data->items),
            'updated_at' => Carbon::now(),
        ]);

        return [
            'id' => $listItems->id,
            'items' => json_decode($listItems->items, true),
        ];
    }
}