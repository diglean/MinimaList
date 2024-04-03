<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\ListListData;
use App\Context\List\Types\ListActiveType;
use App\Context\List\Types\ListModelActiveType;
use Domain\List\Models\Lists;
use Illuminate\Database\Eloquent\Collection;

class ListListAction
{
    public function __construct(
        public Lists $listModel,
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
        $lists = $this->listModel
            ->whereUserId($data->customer_id)
            ->whereActive(ListModelActiveType::Yes)
            ->get();

        // For debugging purposes only - remove in prod
        sleep(1);
        return $lists;
    }

}
