<?php

use App\Http\Controllers\CreateListController;
use Illuminate\Support\Facades\Route;

Route::post('api/list/new', CreateListController::class);
