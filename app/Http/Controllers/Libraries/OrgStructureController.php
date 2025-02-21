<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\TblGroup1;
use App\Models\Libraries\TblGroup2;
use App\Models\Libraries\TblGroup3;
use Illuminate\Http\Request;

class OrgStructureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tblgroup1 = TblGroup1::latest()->get();
        $tblgroup2 = TblGroup2::latest()->get();
        $tblgroup3 = TblGroup3::latest()->get();

        return inertia('Libraries/OrgStructure', [
            'group1' => $tblgroup1,
            'group2' => $tblgroup2,
            'group3' => $tblgroup3
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
