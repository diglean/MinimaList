<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\DeleteListData;
use App\Context\List\Types\ListModelActiveType;
use App\Context\ListItem\Types\ListItemActiveType;
use Domain\ListItem\Models\ListItem;
use Domain\List\Models\Lists;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

class DeleteListAction
{
    public function __construct(
        public Lists $listModel,
        public ListItem $listItem,
    ) {
    }

    public function execute(DeleteListData $data): Collection
    {
        $list = $this->listModel
            ->whereUserId($data->user_id)
            ->whereId($data->list_id)
            ->first();

        if (! is_null($list)) {
            $list->update([
                'active' => ListModelActiveType::No,
                'updated_at' => Carbon::now(),
            ]);
        }

        $listItem = $this->listItem
            ->whereListId($data->list_id)
            ->first();
        

        if (! is_null($listItem)) {
            $listItem->update([
                'active' => ListItemActiveType::No,
                'updated_at' => Carbon::now()
            ]);
        }

        $lists = $this->listModel
            ->whereUserId($data->user_id)
            ->whereActive(ListModelActiveType::Yes)
            ->get();

        return $lists;
    }
}
