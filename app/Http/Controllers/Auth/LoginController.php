<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    /**
     * Show the login page.
     */
    public function index()
    {
        return inertia('Auth/Login');
    }

    /**
 * Handle login authentication.
 */
public function login(Request $request)
{
    $request->validate([
        'username' => 'nullable',
        'password' => 'nullable',
    ]);

    $credentials = ['username' => $request->username, 'password' => $request->password];
    

    if (Auth::guard('web')->attempt($credentials)) {
        $request->session()->regenerate();

     


        // Get authenticated user
        $user = Auth::guard('web')->user();

        // Fetch additional user details with office, division, and unit names
        $userData = DB::table('tbluseraccounts as ua')
            ->join('tblusers as u', 'ua.userid', '=', 'u.userid')
            ->leftJoin('tblgroup1 as g1', 'u.group1code', '=', 'g1.group1Code')
            ->leftJoin('tblgroup2 as g2', function ($join) {
                $join->on('u.group1code', '=', 'g2.group1Code')
                    ->on('u.group2code', '=', 'g2.group2Code');
            })
            ->leftJoin('tblgroup3 as g3', function ($join) {
                $join->on('u.group1code', '=', 'g3.group1Code')
                    ->on('u.group2code', '=', 'g3.group2Code')
                    ->on('u.group3code', '=', 'g3.group3Code');
            })
            ->select(
                'ua.useraccountid', 'ua.userid', 'ua.username', 'ua.password', 'ua.is_active', 'ua.useraccess',
                'u.lastname', 'u.firstname', 'u.middlename', 'u.extension', 'u.group1code', 'u.group2code', 'u.group3code',
                'u.position', 'u.is_active as user_is_active', 'u.is_head',
                'g1.group1Name as office_name', 'g2.group2Name as division_name', 'g3.group3Name as unit_name'
            )
            ->where('ua.userid', $user->userid)
            ->first();
            
        // Store user details in session
        session([
            'user' => $userData
        ]);

        return redirect()->intended('/libraries/users');
    }

    return back()->withErrors([
        'username' => 'Incorrect username or password.',
    ]);
}

    /**
     * Logout the user.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
