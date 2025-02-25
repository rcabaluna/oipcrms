<?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Libraries\OrgStructureController;
    use App\Http\Controllers\Libraries\UsersController;
    use App\Http\Controllers\Libraries\AccountsController;
    use App\Http\Controllers\Auth\LoginController;
    use Illuminate\Http\RedirectResponse;


    Route::middleware(['auth'])->group(function () {
        Route::resource('/libraries/org-structure', OrgStructureController::class);
        Route::resource('/libraries/users', UsersController::class);
        Route::resource('/libraries/accounts', AccountsController::class);

    });

    Route::get('/', function (): RedirectResponse {
        return redirect('/libraries/org-structure');
    });
    
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');
    