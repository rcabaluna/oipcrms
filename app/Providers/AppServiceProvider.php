<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                return $user ? [
                    'useraccountid' => $user->useraccountid,
                    'userid' => $user->userid,
                    'username' => $user->username,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'middlename' => $user->middlename,
                    'extension' => $user->extension,
                    'group1code' => $user->group1code,
                    'group2code' => $user->group2code,
                    'group3code' => $user->group3code,
                    'position' => $user->position,
                    'office_name' => $user->office_name,
                    'division_name' => $user->division_name,
                    'unit_name' => $user->unit_name,
                    'useraccess' => explode(';', $user->useraccess),
                    'avatar' => $user->avatar ?? '/default-avatar.png',
                ] : null;
            },
        ]);
    }
}
