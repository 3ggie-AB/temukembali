<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FontteController extends Controller
{
    public static function kirimPesan($pesan, $penerima)
    {
        $token = env('FONTTE_ID');
        if (!$token) {
            return response()->json(['error' => 'Token not set'], 400);
        }
        $nomorList = explode(',', $penerima);
        $converted = array_map(function ($nomor) {
            $nomor = trim($nomor);
            if (strpos($nomor, '08') === 0) {
                return '62' . substr($nomor, 1);
            }
            return $nomor;
        }, $nomorList);

        // Gabungkan kembali jadi string
        $penerimaFormatted = implode(',', $converted);
        $response = Http::withHeaders([
            'Authorization' => $token,
        ])->asMultipart()->post('https://api.fonnte.com/send', [
            'target' => $penerimaFormatted,
            'message' => $pesan,
        ]);

        $respon = response()->json([
            'status' => $response->status(),
            'body' => $response->body(),
        ]);
        return json_decode($respon->getData()->body, true);
    }
}
