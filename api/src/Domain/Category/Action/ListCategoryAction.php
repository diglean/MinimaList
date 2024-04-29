<?php

namespace Domain\Category\Action;

use App\Context\Category\Types\CategoryActiveType;
use Domain\Category\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class ListCategoryAction
{
	public function __construct(
		public Category $categoryModel,
	) {
	}

	public function execute() : Collection
    {
		$categories = $this->categoryModel->whereActive(CategoryActiveType::Yes)->get();

        return $categories;
	}
}