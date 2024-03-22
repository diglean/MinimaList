<?php

namespace App\Http\Controllers;

use App\Context\List\DataTransferObject\EditListItemData;
use Domain\List\Action\EditListItemAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

/**
 * @author Diego Leandro <https://github.com/diglean>
 */
class EditListItemController extends Controller
{
    public function __construct(
        public readonly Response $response,
    ) {
    }

    public function __invoke(
        Request $request,
        EditListItemAction $action,
    ) {
        $data = EditListItemData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}
