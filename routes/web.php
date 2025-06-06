<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KehilanganController;
use App\Http\Controllers\TemuanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'wa.verified'])
    ->name('dashboard');

Route::middleware(['auth','wa.verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/user/{whatsapp}', [ProfileController::class, 'detail'])->name('profile.detail');

    Route::get('/kehilangan', [KehilanganController::class, 'index'])->name('kehilangan.index');
    Route::get('/kehilangan/create', [KehilanganController::class, 'create'])->name('kehilangan.create');
    Route::post('/kehilangan', [KehilanganController::class, 'store'])->name('kehilangan.store');
    Route::get('/kehilangan/detail/{id}', [KehilanganController::class, 'show'])->name('kehilangan.detail');
    Route::get('/kehilangan/{id}/edit', [KehilanganController::class, 'edit'])->name('kehilangan.edit');
    Route::get('/kehilangan/{id}/edit-foto', [KehilanganController::class, 'edit_foto'])->name('kehilangan.edit-foto');
    Route::post('/kehilangan/{id}/upload-foto', [KehilanganController::class, 'upload_foto'])->name('kehilangan.upload-foto');
    Route::put('/kehilangan/{id}', [KehilanganController::class, 'update'])->name('kehilangan.update');

    Route::get('/temuan', [TemuanController::class, 'index'])->name('temuan.index');
    Route::get('/temuan/create', [TemuanController::class, 'create'])->name('temuan.create');
    Route::post('/temuan', [TemuanController::class, 'store'])->name('temuan.store');
    Route::get('/temuan/detail/{id}', [TemuanController::class, 'show'])->name('temuan.show');
    Route::get('/temuan/{id}/edit', [TemuanController::class, 'edit'])->name('temuan.edit');
    Route::get('/temuan/{id}/edit-foto', [TemuanController::class, 'edit_foto'])->name('temuan.edit-foto');
    Route::post('/temuan/{id}/upload-foto', [TemuanController::class, 'upload_foto'])->name('temuan.upload-foto');
    Route::put('/temuan/{id}', [TemuanController::class, 'update'])->name('temuan.update');
    Route::delete('/temuan/{id}', [TemuanController::class, 'destroy'])->name('temuan.destroy');
});

require __DIR__.'/group/komentarHilang.php';
require __DIR__.'/group/Predict.php';
require __DIR__.'/auth.php';
