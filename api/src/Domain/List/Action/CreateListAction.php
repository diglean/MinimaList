<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\CreateListData;
use Domain\List\Models\ListModel;
use Illuminate\Support\Carbon;

class CreateListAction
{
    public function __construct(
        public ListModel $listModel,
    ) {
    }

    public function execute(CreateListData $data): array
    {
        $createdList = $this->listModel->create([
            'name' => $data->name,
            'created_at' => Carbon::now(),
            'updated_at'=> Carbon::now(),
        ]);

        return ['id' => $createdList->id];
    }
}
