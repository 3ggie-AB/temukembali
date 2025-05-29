<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kota extends Model
{
    protected $table = 'indonesia_cities';

    protected $guarded = [
        'id'
    ];
}
