<?php

namespace Routes\List;

use App\Http\Controllers\CreateListController;
use App\Http\Controllers\ListItemsController;
use App\Http\Controllers\ListListController;
use Illuminate\Support\Facades\Route;

Route::post('api/list/new', [CreateListController::class, '__invoke']);
Route::post('api/list/list', [ListListController::class, '__invoke']);
Route::post('api/list-itens/list', [ListItemsController::class, '__invoke']);
Route::post('api/list-itens/create', [ListItemsController::class, '__invoke']);