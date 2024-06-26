<?php

namespace App\Context\List\DataTransferObject;

use Spatie\LaravelData\Data;

class CreateListData extends Data
{
    public function __construct(
        public string $name,
    ) {
    }

    public function rules(): array
    {
        return ['name' => ['required', 'string', 'max:30']];
    }
}
