<?php

namespace App\Context\List\DataTransferObject;

use Spatie\LaravelData\Data;

class CreateListItemsData extends Data
{
  public function __construct(
    public int $items,
    public string $comment,
  ) {
  }
}
