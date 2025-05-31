<?php
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Laravolt\Indonesia\Models\Province;

Route::get('/provinsi', function () {
    return Province::all();
})->name('provinsi');

Route::get('/kota/{province_id}', function ($province_id) {
    return Laravolt\Indonesia\Models\City::where('province_code', $province_id)->get();
})->name('kabupaten');

Route::get('/data', [DashboardController::class, 'data'])->name('data');