<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\ListListItemData;
use Domain\ListItem\Models\ListItem;

class ListListItemAction
{
    public function __construct(
        public ListItem $listItem,
    ) {
    }

    /**
     * Executes the action to retrieve the list items.
     *
     * @param ListListItemData $data The data for retrieving the list items.
     * @return array The list items, comments, creation and update timestamps.
     */
    public function execute(ListListItemData $data): array
    {
        $listItems = $this->listItem->whereId($data->id)->first();

        if (is_null($listItems)) {
            return [[]];
        }

        $items = json_decode($listItems->items, true);

        sleep(3);

        return [
            'items' => $items,
            'created_at' => $listItems->created_at,
            'updated_at' => $listItems->updated_at,
        ];
    }
}
