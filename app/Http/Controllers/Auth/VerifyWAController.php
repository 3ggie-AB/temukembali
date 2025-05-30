<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifyWAController extends Controller
{
    public function index(){
        return Inertia::render('Auth/VerifikasiWa', [
            'user' => auth()->user(),
        ]);
    }
    public function waVerif(Request $request)
    {
        if(auth()->user()->wa_verified_at > now()){
            return redirect()->back()->with('error', 'Token sudah Habis Masa Aktif.');
        }
        $request->validate([
            'wa_token' => 'required|same:'.auth()->user()->verif_token_wa,
            'alamat' => 'required|string|max:255',
            'provinsi' => 'required|max:255',
            'kota' => 'required|max:255',
        ]);

        $user = User::find(auth()->id());
        $user->wa_verified_at = now();
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Nomor WhatsApp Anda telah berhasil diverifikasi.');
    }
}
