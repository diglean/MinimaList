<?php

namespace Routes\List;

use App\Http\Controllers\List\CreateListController;
use App\Http\Controllers\List\DeleteListController;
use App\Http\Controllers\List\ListListController;
use Illuminate\Support\Facades\Route;

Route::post('api/list/create', [CreateListController::class, '__invoke']);
Route::post('api/list/list', [ListListController::class, '__invoke']);
Route::post('api/list/delete', [DeleteListController::class, '__invoke']);
