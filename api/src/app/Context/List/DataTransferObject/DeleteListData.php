<?php

namespace App\Context\List\DataTransferObject;

use Spatie\LaravelData\Data;

class DeleteListData extends Data
{
    public function __construct(
        public string $listId,
        public int $userId,
    ) {
    }

    public function rules(): array
    {
        return ['list_id' => ['required', 'integer', 'min:1']];
    }
}
