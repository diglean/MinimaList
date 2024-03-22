<?php

namespace App\Http\Controllers;

use App\Context\List\DataTransferObject\CreateListData;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Domain\List\Action\CreateListAction;
use Illuminate\Http\Request;

/**
 * @author Diego Leandro - <https://github.com/diglean>
 */
class CreateListController extends Controller
{
    public function __construct(
        private readonly Response $response
    ) {
    }

    public function __invoke(
        Request $request,
        CreateListAction $action,
    ) {
        $data = CreateListData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
