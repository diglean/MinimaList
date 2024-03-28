<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\CreateListData;
use Domain\List\Models\Lists;
use Illuminate\Support\Carbon;

class CreateListAction
{
    public function __construct(
        public Lists $listModel,
    ) {
    }

    /**
     * Executes the action to create a new list.
     *
     * @param CreateListData $data The data for creating the list.
     * @return array The ID of the created list.
     */
    public function execute(CreateListData $data): array
    {
        $createdList = $this->listModel->create([
            'name' => $data->name,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        return [
            'id' => $createdList->id,
        ];
    }
}
