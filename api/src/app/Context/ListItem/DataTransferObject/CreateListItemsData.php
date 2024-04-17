<?php

namespace App\Context\ListItem\DataTransferObject;

use App\Context\ListItem\Types\ListItemUnityType;
use Illuminate\Validation\Rules\Enum;
use Spatie\LaravelData\Data;

class CreateListItemsData extends Data
{
    public function __construct(
        public int $list_id,
        public string $name,
        public ?string $price,
        public ListItemUnityType $unity,
        public ?int $category_id,
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
            'name' => [
                'required',
                'string',
            ],
            'price' => [
                'null',
                'string',
            ],
            'unity' => [
                'nullable',
                new Enum(ListItemUnityType::class)
            ],
            'category_id' => [
                'nullable',
                'integer',
                'min:1',
            ],
        ];
    }
}
