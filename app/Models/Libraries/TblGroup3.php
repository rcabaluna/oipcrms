<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class TblGroup3 extends Model
{
    protected $table = 'tblgroup3';

    protected $fillable = [
        'group1Code',
        'group2Code',
        'group3Code',
        'group3Name',
        'empNumber'
    ];
}
