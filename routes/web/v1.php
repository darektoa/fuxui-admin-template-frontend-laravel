<?php

namespace App\Http\Controllers\Web\V1;

use Illuminate\Support\Facades\Route;

Route::resource('sign-in', Auth\SignInController::class)->only(['index', 'store']);
Route::resource('sign-out', Auth\SignOutController::class)->only(['delete']);
Route::resource('sign-up', Auth\SignUpController::class)->only(['index', 'store']);

Route::prefix('/menus')->name('menus.')->group(function() {
    Route::prefix('/permissions')->name('permissions.')->group(function() {
        Route::apiResource('types', Menu\Permission\TypeController::class);
    });

    Route::apiResource('permissions', Menu\Permission\PermissionController::class);
});

Route::prefix('/users')->name('users.')->group(function() {
    Route::apiResource('roles', User\RoleController::class);
    Route::apiResource('roles.menuPermissions', User\RoleController::class)->except(['show', 'update']);
});

Route::resource('home', Home\HomeController::class)->only('index');
Route::resource('users', User\UserController::class)->only('index');
