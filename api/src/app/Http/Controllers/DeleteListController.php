<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

class DeleteListController extends Controller
{
    public function __construct(
        private readonly Response $response,
    ) {
    }

    public function __invoke(
        Request $request,
        DeleteListAction $response
    ) {
        $data = DeleteListData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
