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
    public function update(Request $request, Accounts $account)
{
    // Get all input data
    $fields = $request->all();

    // Check if password is present and not null
    if ($request->has('password') && !is_null($request->password)) {
        // Hash the password before updating
        $fields['password'] = bcrypt($request->password);
    } else {
        // Optionally, remove the password from the fields if it is null
        unset($fields['password']);
    }

    // Handle 'useraccess' field: convert array to semicolon-separated string, or set to null
    $fields['useraccess'] = $request->has('useraccess') ? implode(';', $request->useraccess) : null;

    // Update the account with the fields
    $account->update($fields);

    // Redirect with success message
    return redirect()->back()->with('success', 'Account updated successfully!');
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
