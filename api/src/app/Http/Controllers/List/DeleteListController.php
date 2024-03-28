<?php

namespace App\Http\Controllers\List;

use App\Context\List\DataTransferObject\DeleteListData;
use App\Http\Controllers\Controller;
use Domain\List\Action\DeleteListAction;
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
        DeleteListAction $action
    ) {
        $data = DeleteListData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
