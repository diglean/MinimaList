<?php

namespace Routes\List;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Category\ListCategoryController;

Route::post('api/category/list', [ListCategoryController::class, '__invoke']);
