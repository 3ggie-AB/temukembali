<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckWaVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login');
        }

        // Cek apakah wa sudah terverifikasi
        if (is_null($user->wa_verified_at)) {
            return redirect()->route('wa-verifikasi')
                ->with('error', 'Silakan verifikasi nomor WhatsApp Anda terlebih dahulu.');
        }

        return $next($request);
    }
}
