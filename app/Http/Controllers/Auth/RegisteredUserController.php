<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FontteController;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request['whatsapp'] = '+62' . ltrim(str_replace(' ', '', $request->whatsapp), '0');
        $request->validate([
            'name' => 'required|string|max:255',
            'whatsapp' => [
                'required',
                'string',
                'regex:/^\+628[1-9][0-9]{7,11}$/',
                'max:255',
                Rule::unique('users', 'whatsapp'),
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $randToken = bin2hex(random_bytes(16));

        $user = User::create([
            'name' => $request->name,
            'whatsapp' => $request->whatsapp,
            'password' => Hash::make($request->password),
            'token_wa_expired_at' => now()->addMinutes(5),
            'verif_token_wa' => $randToken,
        ]);

        event(new Registered($user));

        FontteController::kirimPesan(
            "Halo {$user->name},\n\n" .
            "Terima kasih telah mendaftar di aplikasi Temu Kembali. Silakan verifikasi nomor WhatsApp Anda dengan mengklik tautan berikut:\n\n" .
            route('wa-verifikasi', ['token' => $randToken]) . "\n\n" .
            "Jika Anda tidak mendaftar, abaikan pesan ini.",
            $user->whatsapp
        );

        Auth::login($user);

        return redirect(route('wa-verifikasi', absolute: false));
    }
}
