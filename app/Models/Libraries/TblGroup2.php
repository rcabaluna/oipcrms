<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class TblGroup2 extends Model
{
    protected $table = 'tblgroup2';

    protected $fillable = [
        'group1Code',
        'group2Code',
        'group2Name',
        'empNumber'
    ];
}
