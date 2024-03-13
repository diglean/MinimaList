<?php

namespace App\Http\Controllers;

use App\Context\List\DataTransferObject\ListItensData;
use Domain\List\Action\ListItensAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

class ListItensController extends Controller
{
  public function __construct(
    public readonly Response $response,
  ) {
  }

  public function __invoke(
    Request $request,
    ListItensAction $action,
  ) {
    $data = ListItensData::from($request->toArray());

    $response = $action->execute($data);

    return $this->response->json($response, 200);
  }
}