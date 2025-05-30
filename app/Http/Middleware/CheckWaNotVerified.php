<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckWaNotVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Kalau sudah verifikasi, redirect ke halaman lain
        if ($user->wa_verified_at) {
            return redirect()->route('dashboard')->with('error', 'Nomor WhatsApp Anda Sudah terverifikasi.'); // ganti sesuai kebutuhan
        }

        return $next($request);
    }
}
