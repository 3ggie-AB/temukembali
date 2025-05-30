<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifyWAController extends Controller
{
    public function index(Request $request)
    {
        $token = $request->query('token');
        return Inertia::render('Auth/VerifikasiWa', [
            'user' => auth()->user(),
            'token' => $token,
        ]);
    }
    public function waVerif(Request $request)
    {
        try {
            $user = User::find(auth()->id());
            if ($user->wa_verified_at > now()) {
                throw new \Exception('Token Anda Sudah Kadaluarsa.');
            }
            if ($user->verif_token_wa != $request->token) {
                throw new \Exception('Token yang Diinput Tidak Sesuai.');
            }
            $request->validate([
                'token' => 'required',
                'alamat' => 'required|string|max:255',
                'provinsi' => 'required|max:255',
                'kota' => 'required|max:255',
            ]);

            $user->update([
                'alamat' => $request->alamat,
                'provinsi' => $request->provinsi,
                'kota' => $request->kota,
                'wa_verified_at' => now(),
                'verif_token_wa' => null,
                'token_wa_expired_at' => null,
            ]);

            return redirect()->route('dashboard')->with('success', 'Nomor WhatsApp Anda telah berhasil diverifikasi.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
