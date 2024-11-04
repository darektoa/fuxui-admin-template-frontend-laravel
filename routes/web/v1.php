<?php

namespace App\Http\Controllers\Web\V1;

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/sign-in');

Route::resource('sign-in', Auth\SignInController::class)->only(['index', 'store']);
Route::resource('sign-out', Auth\SignOutController::class)->only(['delete']);
Route::get('sign-out', [Auth\SignOutController::class, 'destroy']);
Route::resource('sign-up', Auth\SignUpController::class)->only(['index', 'store']);

Route::prefix('/logs')->name('logs.')->group(function() {
    Route::resource('activities', Log\ActivityController::class);
});

Route::prefix('/menus')->name('menus.')->group(function() {
    Route::prefix('/permissions')->name('permissions.')->group(function() {
        Route::resource('types', Menu\Permission\TypeController::class);
    });

    Route::resource('permissions', Menu\Permission\PermissionController::class);
});

Route::prefix('/users')->name('users.')->group(function() {
    Route::resource('roles', User\RoleController::class);
    Route::resource('roles.menuPermissions', User\RoleController::class)->except(['show', 'update']);
});

Route::resource('contents', Content\ContentController::class);
Route::resource('home', Home\HomeController::class)->only('index');
Route::resource('users', User\UserController::class)->except('show');
