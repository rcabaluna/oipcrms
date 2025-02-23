<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class TblGroup1 extends Model
{
    protected $table = 'tblgroup1';

    protected $fillable = [
        'group1id',
        'group1Code',
        'group1Name',
        'empNumber'
    ];
}
