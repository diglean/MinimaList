<?php

namespace App\Http\Controllers\List;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

class ListCategoryController extends Controller
{
	public function __construct(
		private readonly Response $response
	) {
	}

	public function __invoke(
		Request $request,
		ListCategoryAction $action,
	) {
		$data = ListCategoryData::from($request->toArry());

		$response = $action->execute($data);

        return $this->response->json($response, 200);
	}
}