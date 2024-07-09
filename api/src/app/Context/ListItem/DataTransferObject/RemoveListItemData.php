<?php

namespace App\Context\ListItem\DataTransferObject;

use Spatie\LaravelData\Data;

class RemoveListItemData extends Data
{
    public function __construct(
        public int $list_item_id,
        public int $list_id,
    ) {
    }

    public function rules(): array
    {
        return [
            'list_item_id' => ['required', 'integer', 'min:1'],
            'list_id' => ['required', 'integer', 'min:1'],
        ];
    }
}
