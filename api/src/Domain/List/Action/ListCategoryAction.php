<?php

namespace Domain\List\Action;

class ListCategoryAction
{
	public function __construct(
		public Category $category,
	) {
	}
}