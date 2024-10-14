<?php

namespace App\Http\Controllers\Web\V1;

use Illuminate\Support\Facades\Route;

Route::resource('sign-in', Auth\SignInController::class)->only(['index', 'store']);
