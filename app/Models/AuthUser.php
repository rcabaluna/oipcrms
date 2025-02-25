<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AuthUser extends Authenticatable
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
