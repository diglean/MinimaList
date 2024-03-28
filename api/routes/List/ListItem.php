<?php

namespace Routes\List;

use App\Http\Controllers\ListItem\CreateListItemsController;
use App\Http\Controllers\ListItem\EditListItemController;
use App\Http\Controllers\ListItem\ListItemController;
use Illuminate\Support\Facades\Route;

Route::post('api/list-items/list', [ListItemController::class, '__invoke']);
Route::post('api/list-items/create', [CreateListItemsController::class, '__invoke']);
Route::put('api/list-items/edit', [EditListItemController::class, '__invoke']);
