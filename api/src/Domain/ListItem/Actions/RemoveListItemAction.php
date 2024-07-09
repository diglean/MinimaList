<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\RemoveListItemData;
use App\Context\ListItem\Types\ListItemActiveType;
use Domain\List\Models\Lists;
use Domain\ListItem\Models\ListItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

class RemoveListItemAction
{
    public function __construct (
        public ListItem $listItemModel,
        public Lists $listModel,
    ) {
    }

    /**
     * Executes the action to remove a list item.
     *
     * @param RemoveListItemData $data The data for removing the list item.
     * @return array The updated list item and the updated list.
     */
    public function execute(RemoveListItemData $data): Collection
    {
        $listItem = $this->listItemModel
            ->whereId($data->list_item_id)
            ->first();

        $listItem->update([
            'active' => ListItemActiveType::No,
            'updated_at' => Carbon::now(),
        ]);

        $list = $this->listModel->whereId($data->list_id)->get();

        $list->update([
            'items_qty' => $list->items_qty - $listItem->qty,
            'updated_at' => Carbon::now(),
        ]);

        $listItems = $this->listItemModel
            ->whereListId($data->list_id)
            ->whereActive(ListItemActiveType::Yes)
            ->get();

        return $listItems;
    }
}