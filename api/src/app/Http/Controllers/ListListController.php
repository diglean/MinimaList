<?php

namespace App\Http\Controllers;

use App\Context\List\DataTransferObject\ListListData;
use Domain\List\Action\ListListAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

/**
 * @author Diego Leandro - <https://github.com/diglean>
 */
class ListListController extends Controller
{
    public function __construct(
        private readonly Response $response,
    ) {
    }

    public function __invoke(
        Request $request,
        ListListAction $action,
    ) {
        $data = ListListData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
