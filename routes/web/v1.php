<?php

namespace App\Http\Controllers\Web\V1;

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/sign-in');
Route::get('/welcome', function () {
    return 'welcome';
});

Route::resource('sign-in', Auth\SignInController::class)->only(['index', 'store']);
Route::resource('sign-out', Auth\SignOutController::class)->only(['delete']);
Route::get('sign-out', [Auth\SignOutController::class, 'destroy']);
Route::resource('sign-up', Auth\SignUpController::class)->only(['index', 'store']);

Route::prefix('/contents')->name('contents.')->group(function() {
    Route::resource('types', Content\TypeController::class);
});

Route::prefix('/data')->name('data.')->group(function() {
    Route::get('/icons', [Data\IconController::class, 'index']);
});

Route::prefix('/logs')->name('logs.')->group(function() {
    Route::resource('activities', Log\ActivityController::class);
});

Route::prefix('/menus')->name('menus.')->group(function() {
    Route::prefix('permissions')->name('permissions.')->group(function() {
        Route::resource('types', Menu\Permission\TypeController::class);
    });

    Route::resource('permissions', Menu\Permission\PermissionController::class);
});

Route::prefix('/sign-in')->name('sign-in.')->group(function() {
    Route::get('face', [Auth\SignInController::class, 'face']);
    Route::post('face', [Auth\SignInController::class, 'storeFace']);
});

Route::prefix('/settings')->name('settings.')->group(function() {
    Route::prefix('/security')->name('security.')->group(function() {
        Route::resource('/face-sign-in', Setting\Security\FaceSignInController::class);
    });
});

Route::prefix('/users')->name('users.')->group(function() {
    Route::get('/faces', [User\FaceController::class, 'index']);
    Route::resource('roles', User\RoleController::class);
    Route::resource('roles.menuPermissions', User\RoleController::class)->except(['show', 'update']);
});

Route::resource('contents', Content\ContentController::class);
Route::resource('home', Home\HomeController::class)->only('index');
Route::resource('menus', Menu\MenuController::class);
Route::singleton('profile', Profile\ProfileController::class);
Route::resource('users', User\UserController::class)->except('show');
