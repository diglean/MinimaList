<?php

namespace Routes\List;

Route::post('/api/category/list', [ListCategoryController::class, '__invoke']);
