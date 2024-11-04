<?php

namespace App\Http\Middleware;

use App\Helpers\AuthHelper;
use App\Services\ContentService;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'layouts/app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'CSRF_TOKEN'    => csrf_token(),
            'user'          => AuthHelper::user(),
            'inputs'        => Session::getOldInput(),
            'menus'         => (new MenuService)->get(),
            'appContents'   => (new ContentService)->get(new Request(['keyBy' => 'codename'])),
            'flash'              => [
                'errors'  => fn() => $request->session()->get('errors') ?? null,
                'message' => fn() => $request->session()->get('message'),
                'success' => fn() => $request->session()->get('success')
            ],
        ]);
    }
}
