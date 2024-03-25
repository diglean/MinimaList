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

    /**
     * Executes the action to list lists.
     *
     * @param ListListData $data The data for listing the lists.
     * @return Collection The lists.
     */
    public function execute(ListListData $data): Collection
    {
        /** @var Collection $lists */
        $lists = $this->listModel->whereCustomerId($data->customer_id)->get();

        // For debugging purposes only
        sleep(3);
        return $lists;
    }

}
