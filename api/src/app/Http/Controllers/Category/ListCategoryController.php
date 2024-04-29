<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Domain\Category\Action\ListCategoryAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;

class ListCategoryController extends Controller
{
	public function __construct(
		private readonly Response $response
	) {
	}

	public function __invoke(
		ListCategoryAction $action,
	) {
		$response = $action->execute();

        return $this->response->json($response, 200);
	}
}