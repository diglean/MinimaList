<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\EditListItemData;
use Domain\List\Models\ListItem;
use Domain\List\Models\ListModel;
use Illuminate\Support\Carbon;

class EditListItemAction
{
  public function __construct(
      public ListItem $listItem,
      public ListModel $list,
  ) {
  }

  public function execute(EditListItemData $data): array
  {
      $listItem = $this->listItem->whereId($data->id)->first();

      $aListItems = json_decode($listItem->items, true);

      $aListItems[] = $data->item;

      $this->list->update([
          'items_qty' => count($aListItems),
          'updated_at' => Carbon::now(),
      ]);

      $this->listItem->update([
          'items' => json_encode($aListItems),
      ]);

      return $aListItems;
  }
}