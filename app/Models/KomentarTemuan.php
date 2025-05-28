<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KomentarTemuan extends Model
{
    protected $table = 'komentar_temuan';

    protected $guarded = [
        'id'
    ];

    public function laporTemuan()
    {
        return $this->belongsTo(LaporTemuan::class, 'lapor_temuan_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_whatsapp', 'whatsapp');
    }
}
