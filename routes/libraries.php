<?php

use App\Http\Controllers\Libraries\OrgStructureController;
use Illuminate\Support\Facades\Route;

Route::resource('/libraries/org-structure', OrgStructureController::class);