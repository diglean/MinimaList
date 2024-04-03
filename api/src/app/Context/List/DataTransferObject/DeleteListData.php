<?php

namespace App\Context\List\DataTransferObject;

use Spatie\LaravelData\Data;

class DeleteListData extends Data
{
    public function __construct(
        public string $list_id,
        public int $user_id,
    ) {
    }

    public function rules(): array
    {
        return ['list_id' => ['required', 'integer', 'min:1']];
    }
}
