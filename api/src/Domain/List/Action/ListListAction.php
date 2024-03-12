<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\ListListData;
use Domain\List\Models\ListModel;
use Illuminate\Database\Eloquent\Collection;

class ListListAction
{
    public function __construct(
        public ListModel $listModel,
    ) {
    }

    public function execute(ListListData $data): Collection
    {
        $lists = $this->listModel->whereCustomerId($data->customer_id)->get();

        return $lists;
    }
}
