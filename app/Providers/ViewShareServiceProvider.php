<?php

namespace App\Providers;

use App\Models\Content\Directory;
use App\Models\Setting\Setting;
use App\Services\SettingService;
use Illuminate\Support\Facades;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\View;

class ViewShareServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Facades\View::composer('layouts.app', function (View $view) {
            $setting = (new SettingService)->get();

            $view->with('setting', $setting);
        });
    }
}
