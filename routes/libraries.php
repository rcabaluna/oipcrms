<?php

use App\Http\Controllers\Libraries\AccountsController;
use App\Http\Controllers\Libraries\OrgStructureController;
use App\Http\Controllers\Libraries\UsersController;
use Illuminate\Support\Facades\Route;

Route::resource('/libraries/org-structure', OrgStructureController::class);
Route::resource('/libraries/users', UsersController::class);
Route::resource('/libraries/accounts', AccountsController::class);
