<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\Accounts;
use App\Models\Libraries\Users;
use Illuminate\Http\Request;

class AccountsController extends Controller
{
    public function index()
    {
        $users = Users::latest()->get();

        $accounts = Accounts::join('tblusers', 'tblusers.userid', '=', 'tbluseraccounts.userid')
            ->select(
                'tblusers.*',
                'tbluseraccounts.*',
            )
            ->get();

        $usersNotInAccounts = Users::whereNotIn('userid', function ($query) {
            $query->select('userid')->from('tbluseraccounts');
        })->get();

        return inertia('Libraries/Accounts', ['users' => $usersNotInAccounts, 'accounts' => $accounts]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'userid' => 'required|int',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'useraccess' => 'nullable|array',  // Changed to array validation
            'is_active' => 'boolean',
        ]);

        Accounts::create([
            'userid' => $request->userid,
            'username' => $request->username,
            'password' => bcrypt($request->password),  // Hash the password
            'useraccess' => $request->has('useraccess') ? implode(';', $request->useraccess) : null,  // Ensure useraccess is valid
            'is_active' => $request->is_active,
        ]);

        return redirect()->back()->with('success', 'Account created successfully!');  // Success feedback
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Accounts $account)
    {
        $account->delete();

        return redirect()->back()->with('success', 'Record deleted successfully!');
    }
}
