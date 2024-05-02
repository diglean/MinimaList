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
		$total_item = 0;

        for ($i = 0; $i < $data->qty; $i++) {
            $total_item += floatval($data->price);
        }

		$listItem = $this->listItemModel->whereId($data->id)->first();

		$listItem->update([
			'list_id' => $data->list_id,
            'name' => $data->name,
            'price' => floatval($data->price),
            'unit' => $data->unit,
			'qty' => $data->qty,
			'total' => $total_item,
            'updated_at' => Carbon::now(),
		]);

		$list = $this->listModel->whereId($data->list_id);
		$list->update([
			'items_qty' => $list->$listItem + ($listItem - $data->qty),
			'items_total' => $list->total + $total_item,
			'updated_at' => Carbon::now(),
		]);

		/**
		 * Collection of list items that will be sended to frontend.
		 */
		$listItems = $this->listItemModel->whereListId($data->list_id)->get();

		return ['items' => $listItems];
	}
}
