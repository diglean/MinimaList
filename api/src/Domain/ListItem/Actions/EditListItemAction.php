<?php

namespace Domain\ListItem\Actions;

use App\Context\ListItem\DataTransferObject\EditListItemData;
use App\Context\ListItem\Types\ListItemActiveType;
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
			$formattedValue = str_replace('.', '', $data->price);
      $formattedValue = str_replace(',', '.', $formattedValue);

			$total_item += $formattedValue;
		}

		$listItem = $this->listItemModel->whereId($data->id)->first();

		$list = $this->listModel->whereId($data->list_id)->first();

		$list->update(['items_total' => $list->items_total - $listItem->total]);

		$listItem->update([
			'list_id' => $data->list_id,
			'name' => $data->name,
			'price' => $formattedValue,
			'unit' => $data->unit,
			'qty' => $data->qty,
			'total' => $total_item,
			'updated_at' => Carbon::now(),
		]);

		$list->update([
			'items_qty' => $list->items_qty,
			'items_total' => $list->items_total + $total_item,
			'updated_at' => Carbon::now(),
		]);

		$list = $this->listModel->whereId($data->list_id)->first();

		/**
		 * Collection of list items that will be sent to frontend.
		 */
		$listItems = $this->listItemModel
			->whereListId($data->list_id)
			->whereActive(ListItemActiveType::Yes)
			->get();

		$itemsTotal = $this->listModel->whereId($data->list_id)->get('items_total');

		return [
			'items_total' => $itemsTotal,
			'items' => $listItems,
		];
	}
}
