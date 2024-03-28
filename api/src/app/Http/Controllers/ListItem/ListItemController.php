<?php

namespace App\Http\Controllers\ListItem;

use App\Context\List\DataTransferObject\ListItensData;
use App\Http\Controllers\Controller;
use Domain\List\Action\ListListItemAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

/**
 * @author Diego Leandro - <https://github.com/diglean>
 */
class ListItemController extends Controller
{
    public function __construct(
        public readonly Response $response,
    ) {
    }

    public function __invoke(
        Request $request,
        ListListItemAction $action,
    ) {
        $data = ListItensData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
