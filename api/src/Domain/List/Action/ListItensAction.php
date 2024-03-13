<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\ListItensData;
use Domain\List\Models\ListItem;

class ListItensAction
{
    public function __construct(
        public ListItem $listItem,
    ) {
    }

    public function execute(ListItensData $data): array
    {
        $listItems = $this->listItem->whereId($data->id)->get();

        $items = json_decode($listItems->items, true);

        return [
            'items' => $items,
            'comments' => $listItems->comment,
            'created_at' => $listItems->created_at,
            'updated_at' => $listItems->updated_at,
        ];
    }
}
