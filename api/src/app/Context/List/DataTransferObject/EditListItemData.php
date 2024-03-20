<?php

namespace App\Context\List\DataTransferObject;
use Spatie\LaravelData\Data;

class EditListItemData extends Data
{
    public function __construct(
        public int $id,
        public array $item,
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
        'item' => [
            'required',
            'array',
        ],
      ];
    }
}