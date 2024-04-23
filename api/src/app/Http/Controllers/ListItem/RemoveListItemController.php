<?php

namespace App\Http\Controllers\ListItem;

use App\Context\ListItem\DataTransferObject\RemoveListItemData;
use App\Http\Controllers\Controller;
use Domain\ListItem\Actions\RemoveListItemAction;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Http\Request;

class RemoveListItemController extends Controller
{
    public function __construct(
        public readonly Response $response,
    ) {  
    }

    public function __invoke(
        Request $request,
        RemoveListItemAction $action,
    ) {
        $data = RemoveListItemData::from($request->toArray());

        $response = $action->execute($data);

        return $this->response->json($response, 200);
    }
}