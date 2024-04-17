<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\ListListItemData;
use Domain\List\Models\Lists;
use Domain\ListItem\Models\ListItem;

class ListListItemAction
{
    public function __construct(
        public ListItem $listItemModel,
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
        $listItems = $this->listItemModel->whereListId($data->list_id)->get();

        if (is_null($listItems)) {
            return [[]];
        }

        // ! Debug purposes only!!
        sleep(1);

        return [
            'items' => $listItems,
            'created_at' => $listItems->created_at,
            'updated_at' => $listItems->updated_at,
        ];
    }
}
