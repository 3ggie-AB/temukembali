<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporHilang extends Model
{
    protected $table = 'lapor_hilang';

    protected $primaryKey = 'id';

    protected $guarded = [
        'id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_whatsapp', 'whatsapp');
    }

    public function provinsi()
    {
        return $this->belongsTo(Provinsi::class, 'provinsi_hilang', 'code');
    }

    public function kota()
    {
        return $this->belongsTo(Kota::class, 'kota_hilang', 'code');
    }

    public function komentarHilang()
    {
        return $this->hasMany(KomentarHilang::class, 'id_hilang', 'id');
    }

    // public $timestamps = false;
}
