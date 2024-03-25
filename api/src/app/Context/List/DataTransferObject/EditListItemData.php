<?php

namespace App\Context\List\DataTransferObject;
use Spatie\LaravelData\Data;

class EditListItemData extends Data
{
    public function __construct(
        public int $list_id,
        public array $items,
    ) {
    }

    public function rules(): array
    {
      return [
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