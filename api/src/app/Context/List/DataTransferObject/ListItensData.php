<?php

namespace App\Context\List\DataTransferObject;
use Spatie\LaravelData\Data;

class ListItensData extends Data
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