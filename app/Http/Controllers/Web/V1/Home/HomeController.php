<?php

namespace App\Http\Controllers\Web\V1\Home;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Home\IndexRequest;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(IndexRequest $request)
    {
        try {
            $resMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env("API_BASE_URL") . "/menus");
            $resPermissions = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env("API_BASE_URL") . "/menus/permissions");
            $resRoles = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env("API_BASE_URL") . "/users/roles");
            $resUsers = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env("API_BASE_URL") . "/users");
            $resUsersChart = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env("API_BASE_URL") . "/users/charts");

            $resMenus->throwIfClientError();
            $resMenus->throwIfClientError();
            $resPermissions->throwIfClientError();
            $resPermissions->throwIfClientError();
            $resRoles->throwIfClientError();
            $resRoles->throwIfClientError();
            $resUsers->throwIfClientError();
            $resUsers->throwIfClientError();
            $resUsersChart->throwIfServerError();
            $resUsersChart->throwIfServerError();

            $menus          = $resMenus->object()->data;
            $permissions    = $resPermissions->object()->data;
            $roles          = $resRoles->object()->data;
            $users          = $resUsers->object()->data;
            $usersChart     = $resUsersChart->object()->data;

            return Inertia::render("Routes", compact(
                "menus",
                "permissions",
                "roles",
                "users",
                "usersChart",
            ));
        } catch (Exception $e) {
            return redirect()->route("sign-in.index");
        }
    }
}
