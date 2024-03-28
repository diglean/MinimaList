<?php

namespace App\Http\Controllers\ListItem;

use App\Context\List\DataTransferObject\CreateListItemsData;
use App\Http\Controllers\Controller;
use Domain\List\Action\CreateListItemAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

/**
 * @author Diego Leandro - <https://github.com/diglean>
 */
class CreateListItemsController extends Controller
{
    public function __construct(
        public readonly Response $response,
    ) {
    }

    public function __invoke(
        Request $request,
        CreateListItemAction $action,
    ) {
        $data = CreateListItemsData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
