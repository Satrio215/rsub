<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\RekamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        //'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});








Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/pasiens', [PasienController::class, 'index'])->name('pasiens.index');
    Route::get('/pasien', [PasienController::class, 'create'])->name('pasiens.create');
    Route::post('/pasiens', [PasienController::class, 'store'])->name('pasiens.store');
    Route::delete('/pasiens/{id}', [PasienController::class, 'destroy'])->name('pasiens.destroy');
    Route::get('/pasiens/{id}', [PasienController::class, 'show'])->name('pasiens.show');


    Route::get('/rekams', [RekamController::class, 'index'])->name('rekams.index');
    Route::get('/rekam', [RekamController::class, 'create'])->name('rekams.create');
    Route::post('/rekams/create', [RekamController::class, 'store'])->name('rekams.store');
    Route::delete('/rekams/{id}', [RekamController::class, 'destroy'])->name('rekams.destroy');
    Route::get('/rekams/{id}', [RekamController::class, 'show'])->name('rekams.show');


});


require __DIR__.'/auth.php';
