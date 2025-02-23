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
        $tblgroup2 = TblGroup2::join('tblgroup1', 'tblgroup1.group1Code', '=', 'tblgroup2.group1Code')
            ->select(
                'tblgroup2.group2Code',
                'tblgroup2.group2Name',
                'tblgroup2.empNumber',
                'tblgroup1.group1Code',
                'tblgroup1.group1Name',
                'tblgroup1.empNumber'
            )
            ->get();


        $tblgroup3 = TblGroup3::join('tblgroup2', 'tblgroup2.group2Code', '=', 'tblgroup3.group2Code')
            ->join('tblgroup1', 'tblgroup1.group1Code', '=', 'tblgroup3.group1Code')
            ->select(
                'tblgroup1.group1id',
                'tblgroup1.group1Code',
                'tblgroup1.group1Name',
                'tblgroup2.group2Code',
                'tblgroup2.group2Name',
                'tblgroup3.group3Code',
                'tblgroup3.group3Name',
                'tblgroup3.empNumber'
            )
            ->get();

        return inertia('Libraries/OrgStructure', [
            'group1' => $tblgroup1,
            'group2' => $tblgroup2,
            'group3' => $tblgroup3
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'officename' => 'nullable|string|max:255',
            'officecode' => 'nullable|string|max:255',
            'divisionname' => 'nullable|string|max:255',
            'divisioncode' => 'nullable|string|max:255',
            'unitname' => 'nullable|string|max:255',
            'unitcode' => 'nullable|string|max:255',
            'group' => 'required|string|in:group1,group2,group3',
        ]);

        if ($request->group === 'group1') {
            TblGroup1::create([
                'group1Name' => $request->officename,
                'group1Code' => $request->officecode,
            ]);
        }

        if ($request->group === 'group2') {
            TblGroup2::create([
                'group1Code' => $request->officecode,
                'group2Name' => $request->divisionname,
                'group2Code' => $request->divisioncode,
            ]);
        }

        if ($request->group === 'group3') {
            TblGroup3::create([
                'group1Code' => $request->officecode,
                'group2Code' => $request->divisioncode,
                'group3Name' => $request->unitname,
                'group3Code' => $request->unitcode,
            ]);
        }
        
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
    public function destroy(string $id)
    {
        //
    }
}
