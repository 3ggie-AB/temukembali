<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PredictController extends Controller
{
    public function manualHilang($id)
    {
        $hilang = \App\Models\LaporHilang::findOrFail($id);
        $laporTemuan = \App\Models\LaporTemuan::
            where('status', 'hilang')->get();
        if($laporTemuan->isEmpty()) {
            return [
                'message' => 'Tidak ada data temuan yang tersedia untuk perbandingan.',
                'success' => false,
                'data' => [],
            ];
        }
        $hasilKemiripan = [];

        foreach ($laporTemuan as $temuan) {
            $totalPersen = 0;
            $jumlahKolom = 5;
            similar_text($hilang->deskripsi, $temuan->deskripsi, $p1);
            similar_text($hilang->barang_kategori, $temuan->barang_kategori, $p2);
            similar_text($hilang->barang_warna, $temuan->barang_warna, $p3);
            similar_text($hilang->barang_merk, $temuan->barang_merk, $p4);
            similar_text($hilang->barang_cirikhusus, $temuan->barang_cirikhusus, $p5);

            // Hitung rata-rata
            $totalPersen = ($p1 + $p2 + $p3 + $p4 + $p5) / $jumlahKolom;
            if (round($totalPersen, 2) >= 50) {
                $hasilKemiripan[] = [
                    'temuan_id' => $temuan->id,
                    'persentase_kemiripan' => round($totalPersen, 2),
                    'data_temuan' => $temuan,
                ];
            }
        }
        if (empty($hasilKemiripan)) {
            return [
                'message' => 'Tidak ada data temuan yang mirip dengan laporan hilang ini.',
                'success' => false,
                'data' => [],
            ];
        }

        // Urutkan dari yang paling mirip
        usort($hasilKemiripan, fn($a, $b) => $b['persentase_kemiripan'] <=> $a['persentase_kemiripan']);

        // Ambil hasil teratas
        $top3 = array_slice($hasilKemiripan, 0, 3);
        return [
            'message' => 'Berhasil mendapatkan data temuan yang mirip.',
            'success' => true,
            'data' => $top3,
        ];
    }
}