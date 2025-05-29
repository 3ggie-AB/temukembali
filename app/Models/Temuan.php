<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temuan extends Model
{
    use HasFactory;

    protected $table = 'lapor_temuan';

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
