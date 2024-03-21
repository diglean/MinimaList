<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\CreateListItemsData;
use Domain\List\Models\ListItem;
use Domain\List\Models\ListModel;
use Illuminate\Support\Carbon;

class CreateListItemsAction
{
    public function __construct(
      public ListItem $listItem,
      public ListModel $list,
    ) {
    }

    public function execute(CreateListItemsData $data): array
    {
        $listItems = $this->listItem->create([
          'list_id' => 1,
          'items' => json_encode($data->items),
          'comment' => $data->comment,
          'created_at' => Carbon::now(),
          'updated_at' => Carbon::now(),
        ]);

        $this->list->whereId(1)->update([
            'items_id' => $listItems->id,
            'items_qty' => count($data->items),
            'updated_at' => Carbon::now(),
        ]);

        return json_decode($listItems->items, true);
    }
}
