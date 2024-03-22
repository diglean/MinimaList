<?php

namespace Routes\List;

use App\Http\Controllers\CreateListItemsController;
use App\Http\Controllers\EditListItemController;
use App\Http\Controllers\ListItemsController;
use Illuminate\Support\Facades\Route;

Route::post('api/list-items/list', [ListItemsController::class, '__invoke']);
Route::post('api/list-items/create', [CreateListItemsController::class, '__invoke']);
Route::post('api/list-items/edit', [EditListItemController::class, '__invoke']);
