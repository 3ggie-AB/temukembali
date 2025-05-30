<?php

use App\Http\Controllers\KomentarHilangController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;


Route::middleware(['auth', 'wa.verified'])->group(function () {
    Route::get('/komentar-hilang/{id}', [KomentarHilangController::class, 'index'])
        ->name('komentar-hilang.index');

    Route::get('/komentar-hilang-new/{id}', [KomentarHilangController::class, 'new'])
        ->name('komentar-hilang.new');

    Route::post('/komentar-hilang/{id}', [KomentarHilangController::class, 'store'])
        ->name('komentar-hilang.store');
});
