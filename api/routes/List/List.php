<?php

namespace Routes\List;

use App\Http\Controllers\CreateListController;
use App\Http\Controllers\ListItensController;
use App\Http\Controllers\ListListController;
use Illuminate\Support\Facades\Route;

Route::post('api/list/new', [CreateListController::class, '__invoke']);
Route::post('api/list/list', [ListListController::class, '__invoke']);
Route::post('api/list/list-itens', [ListItensController::class, '__invoke']);