<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\DeleteListData;
use App\Context\List\Types\ListActiveType;
use App\Context\List\Types\ListItemActiveType;
use Domain\ListItem\Models\ListItem;
use Domain\List\Models\Lists;
use Illuminate\Support\Carbon;

class DeleteListAction
{
    public function __construct(
        public Lists $listModel,
        public ListItem $listItem,
    ) {
    }

    public function execute(DeleteListData $data): void
    {
        $this->listModel
            ->whereUserId($data->userId)
            ->whereId($data->listId)
            ->first()
            ->update([
                'active' => ListActiveType::No,
                'updated_at' => Carbon::now(),
            ]);

        $this->listItem
            ->whereListId($data->listId)
            ->first()
            ->update([
                'active' => ListItemActiveType::No,
                'updated_at' => Carbon::now()
            ]);
    }
}
