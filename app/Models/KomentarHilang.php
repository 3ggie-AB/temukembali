<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KomentarHilang extends Model
{
    protected $table = 'komentar_hilang';

    protected $guarded = [
        'id'
    ];

    public function laporHilang()
    {
        return $this->belongsTo(LaporHilang::class, 'lapor_hilang_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_whatsapp', 'whatsapp');
    }
}
