<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request, $whatsapp)
    {
        $user = User::where('whatsapp', $whatsapp)->first();
        if (!$user) {
            return redirect()->route('register')->with('error', 'Akun tidak ditemukan.');
        }
        return Inertia::render('Auth/ResetPassword', [
            'token' => $request->query('token'),
            'whatsapp' => $whatsapp,
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required|exists:password_reset_tokens,token',
            'whatsapp' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        
        $user = User::where('whatsapp', $request->whatsapp)->first()->update([
            'password' => Hash::make($request->password),
        ]);
        DB::table('password_reset_tokens')->where('email', $request->whatsapp)->delete();
        return redirect()->route('login')->with('status', 'Password berhasil diubah. Silakan masuk dengan kata sandi baru Anda.');
    }
}
