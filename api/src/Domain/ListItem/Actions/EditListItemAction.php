<?php

namespace Domain\List\Action;

use App\Context\List\DataTransferObject\EditListItemData;
use Domain\ListItem\Models\ListItem;
use Domain\List\Models\Lists;
use Illuminate\Support\Carbon;

class EditListItemAction
{
  public function __construct(
      public ListItem $listItem,
      public Lists $list,
  ) {
  }

	public function execute(EditListItemData $data): array
	{
		$listItem = $this->listItem->whereId($data->list_id)->first();

		$aListItems = json_decode($listItem->items, true);

		$aListItems[] = $data->items[0];

		$this->list->update([
			'items_qty' => count($aListItems),
			'updated_at' => Carbon::now(),
		]);

		$listItem->update([
			'items' => json_encode($aListItems),
		]);

		return ['items' => $aListItems];
	}
}
