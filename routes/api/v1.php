<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Facades\Route;

Route::prefix('/data')->name('data.')->group(function() {
    Route::get('/icons', [Data\IconController::class, 'index']);
});

Route::prefix('/users')->name('users.')->group(function() {
    Route::get('/faces', [User\FaceController::class, 'index']);
});
