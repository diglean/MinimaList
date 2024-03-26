<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\DeleteListData;
use Domain\List\Models\ListModel;
use Illuminate\Support\Carbon;

class DeleteListAction
{
    public function __construct(
        public ListModel $listModel,
    ) {
    }

    public function execute(DeleteListData $data): void
    {
        $this->listModel->whereId($data->listId)->update([
            'active' => 'no',
            'updated_at' => Carbon::now(),
        ]);
    }
}
