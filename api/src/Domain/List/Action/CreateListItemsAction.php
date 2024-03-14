<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\CreateListItemsData;
use Domain\List\Models\ListItem;
use Illuminate\Support\Carbon;

class CreateListAction
{
    public function __construct(
      public ListItem $listItem,
    ) {
    }

    public function execute(CreateListItemsData $data): array
    {
        $this->listItem->create([
          'items' => json_encode($data->items),
          'comment' => $data->comment,
          'created_at' => Carbon::now(),
          'updated_at' => Carbon::now(),
        ]);
    }
}