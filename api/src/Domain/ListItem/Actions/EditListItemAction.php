<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\EditListItemData;
use Domain\ListItem\Models\ListItem;
use Domain\List\Models\Lists;
use Illuminate\Support\Carbon;

class EditListItemAction
{
	public function __construct(
		public ListItem $listItemModel,
		public Lists $listModel,
	) {
	}

	public function execute(EditListItemData $data): array
	{
		$listItem = $this->listItemModel->whereId($data->id)->first();

		$aListItems = $this->listItemModel->whereListId($data->list_id)->get();

		$this->listModel->whereId($data->list_id)->update([
			'items_qty' => $aListItems->count(),
			'updated_at' => Carbon::now(),
		]);

		$listItem->update([
			'list_id' => $data->list_id,
            'name' => $data->name,
            'price' => floatval($data->price),
            'unity' => $data->unity,
            'updated_at' => Carbon::now(),
		]);

		return ['items' => $aListItems];
	}
}
