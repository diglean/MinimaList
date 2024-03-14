<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

class CreateListItemsController extends Controller
{
  public function __construct(
    public readonly Response $response,
  ) {
  }

  public function __invoke(
    Request $request,
    CreateListItemsAction $action,
  ) {
    $data = CreateListItemsData::from($request->toArray());

    $response = $action->execute($data);

    return $this->response->json($response, 200);
  }
}