<?php

namespace Routes\List;

use App\Http\Controllers\ListItem\CreateListItemsController;
use App\Http\Controllers\ListItem\EditListItemController;
use App\Http\Controllers\ListItem\ListItemController;
use App\Http\Controllers\ListItem\RemoveListItemController;
use Illuminate\Support\Facades\Route;

Route::post('api/list-item/list', [ListItemController::class, '__invoke']);
Route::post('api/list-item/create', [CreateListItemsController::class, '__invoke']);
Route::post('api/list-item/edit', [EditListItemController::class, '__invoke']);
Route::post('api/list-item/remove-item', [RemoveListItemController::class, '__invoke']);
