<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FontteController;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request['whatsapp'] = '+62' . ltrim(str_replace(' ', '', $request->whatsapp), '0');
        $request->validate([
            'whatsapp' => 'required|exists:users,whatsapp',
        ]);
        $token = Str::random(6);
        $kirimPesan = FontteController::kirimPesan(
            "Halo! Berikut adalah token untuk mengatur ulang kata sandi Anda:\n\n🔐 Token: ".$token.
            "\n\nSilakan gunakan token ini untuk mengatur ulang kata sandi Anda melalui tautan berikut:\n\n".
            url('/reset-password/' . str_replace('+', '', $request->whatsapp) . '?token=' . $token).
            "\n\nJika Anda tidak merasa meminta reset kata sandi, abaikan pesan ini.".
            "\nTerima kasih!",
            str_replace('+', '', $request->whatsapp),
        );
        DB::table('password_reset_tokens')->where('email', str_replace('+', '', $request->whatsapp))->delete();
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => str_replace('+', '', $request->whatsapp)],
            [
                'token' => $token,
                'created_at' => now()
            ]
        );
        return redirect()->route('password.reset', ['whatsapp' => str_replace('+', '', $request->whatsapp)]);
    }
}
