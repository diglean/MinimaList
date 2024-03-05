<?php

namespace Domain\List\Action;

use Domain\List\Models\ListModel;

class CreateListAction
{
    public function __construct(
        public ListModel $listModel,
    ) {
    }

    public function execute($data): void
    {
        $this->listModel->create([
            'name' => $data->name,
        ]);
    }
}
