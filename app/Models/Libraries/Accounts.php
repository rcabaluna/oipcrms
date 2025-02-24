<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class Accounts extends Model
{
    protected $table = 'tbluseraccounts';

    protected $primaryKey = 'useraccountid';

    protected $fillable = [
        'userid',
        'username',
        'password',
        'is_active',
        'useraccess'
    ];

    // Disable timestamps if the table does not have created_at and updated_at fields
    public $timestamps = false;
}
