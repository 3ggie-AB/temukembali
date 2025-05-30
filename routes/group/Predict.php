<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PredictController;


Route::middleware('auth')->prefix('predict')->group(function () {
    Route::get('/manual-hilang-{id}', [PredictController::class, 'manualHilang'])
        ->name('predict.manual.hilang');
    Route::get('/manual-temuan-{id}', [PredictController::class, 'manualTemuan'])
        ->name('predict.manual.temuan');
});
