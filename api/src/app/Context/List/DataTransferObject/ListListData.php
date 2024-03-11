<?php

namespace App\Context\List\DataTransferObject;

use Spatie\LaravelData\Data;

class ListListData extends Data
{
    public function __construct(
        public int $customer_id,
    ) {
    }

    public function rules(): array
    {
        return ['customer_id' => ['required', 'integer', 'min:1']];
    }
}
