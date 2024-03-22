<?php

namespace App\Http\Controllers;

use App\Context\List\DataTransferObject\ListItensData;
use Domain\List\Action\ListItemsAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

/**
 * @author Diego Leandro - <https://github.com/diglean>
 */
class ListItemsController extends Controller
{
    public function __construct(
        public readonly Response $response,
    ) {
    }

    public function __invoke(
        Request $request,
        ListItemsAction $action,
    ) {
        $data = ListItensData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
