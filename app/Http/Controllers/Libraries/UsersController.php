<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\Users;
use App\Models\Libraries\TblGroup1;
use App\Models\Libraries\TblGroup2;
use App\Models\Libraries\TblGroup3;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tblgroup1 = TblGroup1::latest()->get();
        $tblgroup2 = TblGroup2::latest()->get();
        $tblgroup3 = TblGroup3::latest()->get();

        $users = Users::leftJoin('tblgroup3', 'tblusers.group3code', '=', 'tblgroup3.group3Code')
            ->leftJoin('tblgroup2', 'tblusers.group2code', '=', 'tblgroup2.group2Code')
            ->leftJoin('tblgroup1', 'tblusers.group1code', '=', 'tblgroup1.group1Code')
            ->select(
                'tblusers.*',
                'tblgroup1.group1Name',
                'tblgroup2.group2Name',
                'tblgroup3.group3Name'
            )
            ->get();

        return inertia('Libraries/Users', [
            'users' => $users,
            'group1' => $tblgroup1,
            'group2' => $tblgroup2,
            'group3' => $tblgroup3
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'extension' => 'nullable|string|max:10',
            'position' => 'required|string|max:255',
            'officecode' => 'nullable|string|max:50',
            'divisioncode' => 'nullable|string|max:50',
            'unitcode' => 'nullable|string|max:50',
            'is_head' => 'boolean',
        ]);

        Users::create([
            'lastname' => $request->lastname,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'extension' => $request->extension,
            'position' => $request->position,
            'group1Code' => $request->officecode,
            'group2Code' => $request->divisioncode,
            'group3Code' => $request->unitcode,
            'is_head' => $request->is_head,
        ]);

        return redirect()->back()->with('success', 'Record added successfully!');
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
    public function destroy(Users $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'Record deleted successfully!');
    }
}
