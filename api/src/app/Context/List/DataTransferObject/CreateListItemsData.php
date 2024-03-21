<?php

namespace App\Context\List\DataTransferObject;

use Spatie\LaravelData\Data;

class CreateListItemsData extends Data
{
    public function __construct(
        public int $list_id,
        public array $items,
        public ?string $comment,
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
            ],
            'comment' => [
                'nullable',
                'string'
            ],
        ];
    }
}
