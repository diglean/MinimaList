<?php

namespace Domain\List\Action;
use App\Context\List\DataTransferObject\ListItensData;
use Domain\List\Models\ListItem;

class ListItensAction
{
  public function __construct(
    public ListItem $listItem,
  ) {
  }

  public function execute(ListItensData $data): array
  {
    // $listItems = $this->listItem->where
    return [];
  }
}