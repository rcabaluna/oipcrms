<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;

    protected $table = 'tblusers';

    protected $primaryKey = 'userid';

    protected $fillable = [
        'userid',
        'lastname',
        'firstname',
        'middlename',
        'extension',
        'group1Code',
        'group2Code',
        'group3Code',
        'position',
        'is_active',
        'is_head'
    ];

    public $timestamps = true;
}
