<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporHilang extends Model
{
    protected $table = 'lapor_hilang';

    protected $primaryKey = 'id';

    protected $fillable = [
        'user_whatsapp',
        'deskripsi',
        'provinsi_hilang',
        'kota_hilang',
        'tanggal_hilang',
        'barang_kategori',
        'barang_warna',
        'barang_merk',
        'barang_cirikhusus',
        'status',
        'jumlah_dilihat',
    ];

    public $timestamps = false;
}
