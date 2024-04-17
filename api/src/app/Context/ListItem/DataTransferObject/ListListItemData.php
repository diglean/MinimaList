<?php

namespace App\Context\ListItem\DataTransferObject;
use Spatie\LaravelData\Data;

class ListListItemData extends Data
{
    public function __construct(
        public int $list_id,
    ) {
    }

    public function rules(): array
    {
        return ['list_id' => ['required', 'string', 'min:1']];
    }
}