<?php

use App\Http\Controllers\CreateListController;
use Illuminate\Support\Facades\Route;

Route::post('/list/new', CreateListController::class);
