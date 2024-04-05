<?php

namespace App\Context\ListItem\DataTransferObject;
use Spatie\LaravelData\Data;

class EditListItemData extends Data
{
    public function __construct(
		public int $id,
        public int $list_id,
        public array $items,
    ) {
    }

    public function rules(): array
    {
      return [
		'id' => [
			'required',
			'integer',
			'min:1',
		],
        'list_id' => [
            'required',
            'integer',
            'min:1',
        ],
        'items' => [
            'required',
            'array',
        ],
      ];
    }
}