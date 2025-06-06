<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporTemuan extends Model
{
    protected $table = 'lapor_temuan';

    protected $primaryKey = 'id';

    protected $guarded = [
        'id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_whatsapp', 'whatsapp');
    }

    public function komentarTemuan()
    {
        return $this->hasMany(KomentarTemuan::class, 'id_temuan', 'id');
    }
    public function provinsi()
    {
        return $this->belongsTo(Provinsi::class, 'provinsi_temuan', 'code');
    }

    public function kota()
    {
        return $this->belongsTo(Kota::class, 'kota_temuan', 'code');
    }

    // public $timestamps = false;
}
