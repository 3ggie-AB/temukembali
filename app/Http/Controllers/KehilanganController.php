<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LaporHilang;
use Inertia\Inertia;

class KehilanganController extends Controller
{
    public function index(Request $request)
    {
        // Ambil data kehilangan yang user sendiri laporkan (berdasarkan whatsapp user login)
        // Asumsi user login pakai whatsapp sebagai identifier
        $userWhatsapp = auth()->user()->whatsapp;

        $kehilangan = LaporHilang::where('user_whatsapp', $userWhatsapp)
            ->orderBy('tanggal_hilang', 'desc')
            ->get([
                'id',
                'deskripsi',
                'tanggal_hilang',
                'status',
                'barang_kategori',
                'barang_warna',
                'barang_merk',
            ]);

         return inertia('kehilangan/KehilanganList', [
            'kehilangan' => $kehilangan,
        ]);
    }


    public function create()
    {
       return Inertia::render('kehilangan/KehilanganCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required|string',
            'provinsi_hilang' => 'nullable|integer',
            'kota_hilang' => 'nullable|integer',
            'tanggal_hilang' => 'required|date',
            'barang_kategori' => 'required|string|max:255',
            'barang_warna' => 'nullable|string|max:255',
            'barang_merk' => 'nullable|string|max:255',
            'barang_cirikhusus' => 'nullable|string',
            // 'status' default 'hilang', tidak wajib input user
        ]);

        LaporHilang::create([
            'user_whatsapp' => auth()->user()->whatsapp,
            'deskripsi' => $request->deskripsi,
            'provinsi_hilang' => $request->provinsi_hilang,
            'kota_hilang' => $request->kota_hilang,
            'tanggal_hilang' => $request->tanggal_hilang,
            'barang_kategori' => $request->barang_kategori,
            'barang_warna' => $request->barang_warna,
            'barang_merk' => $request->barang_merk,
            'barang_cirikhusus' => $request->barang_cirikhusus,
            'status' => 'hilang',
            'jumlah_dilihat' => 0,
        ]);

        return redirect()->route('kehilangan.create')->with('success', 'Laporan kehilangan berhasil dibuat!');
    }
}
