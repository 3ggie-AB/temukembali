<?php

namespace App\Http\Controllers;

use App\Models\LaporHilang;
use App\Models\LaporTemuan;
use Illuminate\Http\Request;

class PredictController extends Controller
{
    private function hitungKemiripan($hilang, $temuan, $weights)
    {
        similar_text($hilang->deskripsi, $temuan->deskripsi, $p1);
        similar_text($hilang->barang_kategori, $temuan->barang_kategori, $p2);
        similar_text($hilang->barang_warna, $temuan->barang_warna, $p3);
        similar_text($hilang->barang_merk, $temuan->barang_merk, $p4);
        similar_text($hilang->barang_cirikhusus, $temuan->barang_cirikhusus, $p5);

        return round(($p1 * $weights['deskripsi']) +
                     ($p2 * $weights['barang_kategori']) +
                     ($p3 * $weights['barang_warna']) +
                     ($p4 * $weights['barang_merk']) +
                     ($p5 * $weights['barang_cirikhusus']), 2);
    }

    public function manualHilang($id)
    {
        $hilang = LaporHilang::findOrFail($id);
        $laporTemuan = LaporTemuan::
        where('user_whatsapp', '!=', $hilang->user_whatsapp)->
        // where('status', 'hilang')->
        get();

        if ($laporTemuan->isEmpty()) {
            return [
                'message' => 'Tidak ada data temuan yang tersedia untuk perbandingan.',
                'success' => false,
                'data' => [],
            ];
        }

        // Definisikan bobot (bisa disesuaikan sesuai prioritas)
        $weights = [
            'deskripsi' => 0.25,
            'barang_kategori' => 0.15,
            'barang_warna' => 0.2,
            'barang_merk' => 0.2,
            'barang_cirikhusus' => 0.2,
        ];

        $hasilKemiripan = [];

        foreach ($laporTemuan as $temuan) {
            $kemiripan = $this->hitungKemiripan($hilang, $temuan, $weights);

            if ($kemiripan >= 50) {
                $hasilKemiripan[] = [
                    'temuan_id' => $temuan->id,
                    'persentase_kemiripan' => $kemiripan,
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

        return [
            'message' => 'Berhasil mendapatkan data temuan yang mirip.',
            'success' => true,
            'data' => $hasilKemiripan,
        ];
    }

    public function manualTemuan($id)
    {
        $temuan = LaporTemuan::findOrFail($id);
        $laporHilang = LaporHilang::
        where('user_whatsapp', '!=', $temuan->user_whatsapp)->
        // where('status', 'temuan')->
        get();

        if ($laporHilang->isEmpty()) {
            return [
                'message' => 'Tidak ada data temuan yang tersedia untuk perbandingan.',
                'success' => false,
                'data' => [],
            ];
        }

        // Definisikan bobot (bisa disesuaikan sesuai prioritas)
        $weights = [
            'deskripsi' => 0.25,
            'barang_kategori' => 0.15,
            'barang_warna' => 0.2,
            'barang_merk' => 0.2,
            'barang_cirikhusus' => 0.2,
        ];

        $hasilKemiripan = [];

        foreach ($laporHilang as $hilang) {
            $kemiripan = $this->hitungKemiripan($temuan, $hilang, $weights);

            if ($kemiripan >= 50) {
                $hasilKemiripan[] = [
                    'temuan_id' => $temuan->id,
                    'persentase_kemiripan' => $kemiripan,
                    'data_temuan' => $temuan,
                ];
            }
        }

        if (empty($hasilKemiripan)) {
            return [
                'message' => 'Tidak ada data temuan yang mirip dengan laporan temuan ini.',
                'success' => false,
                'data' => [],
            ];
        }

        // Urutkan dari yang paling mirip
        usort($hasilKemiripan, fn($a, $b) => $b['persentase_kemiripan'] <=> $a['persentase_kemiripan']);

        return [
            'message' => 'Berhasil mendapatkan data temuan yang mirip.',
            'success' => true,
            'data' => $hasilKemiripan,
        ];
    }
}
