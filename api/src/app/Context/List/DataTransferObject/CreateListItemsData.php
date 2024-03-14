<?php

namespace App\Context\List\DataTransferObject;

use Spatie\LaravelData\Data;

class CreateListItemsData extends Data
{
    public function __construct(
        public array $items,
        public string $comment,
    ) {
    }

    public function rules(): array
    {
        return [
            'items' => [
                'required',
                'array',
            ],
            'comment' => [
                'nullable',
                'string'
            ],
        ];
    }
}
