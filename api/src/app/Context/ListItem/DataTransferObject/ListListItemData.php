<?php

namespace App\Context\ListItem\DataTransferObject;
use Spatie\LaravelData\Data;

class ListListItemData extends Data
{
  public function __construct(
    public int $id,
  ) {
  }

  public function rules(): array
  {
    return ['id' => ['required', 'string', 'min:1']];
  }
}