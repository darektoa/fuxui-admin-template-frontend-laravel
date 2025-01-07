<?php

namespace App\Http\Controllers\Web\V1\Menu\Permission;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Menu\Permission\{
    DestroyRequest,
    EditRequest,
    IndexRequest,
    ShowRequest,
    StoreRequest,
    UpdateRequest,
};
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus/permissions');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $permissions = $response->object()->data;

            return Inertia::render('Routes', compact(
                'permissions'
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Display the specified resource.
     */
    public function edit(EditRequest $request, string $id)
    {
        try {
            $resMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus');
            $resPermission = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/menus/permissions/$id");
            $resPermissions = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus/permissions');
            $resPermTypes = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus/permissions/types');

            $resMenus->throwIfClientError();
            $resMenus->throwIfServerError();
            $resPermission->throwIfClientError();
            $resPermission->throwIfServerError();
            $resPermissions->throwIfClientError();
            $resPermissions->throwIfServerError();
            $resPermTypes->throwIfClientError();
            $resPermTypes->throwIfServerError();

            $menus = $resMenus->object()->data;
            $permission = $resPermission->object()->data;
            $permissions = $resPermissions->object()->data;
            $permissionTypes = $resPermTypes->object()->data;

            return Inertia::render('Routes', compact(
                'menus',
                'permission',
                'permissions',
                'permissionTypes',
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withBody($request->toArray())
                ->post(env('API_BASE_URL') . '/menus/permissions');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $permissions = $response->object()->data;

            return Inertia::render('Routes', compact(
                'permissions'
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus/permissions');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $permissions = $response->object()->data;

            return Inertia::render('Routes', compact(
                'permissions'
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->post(env('API_BASE_URL') . "/menus/permissions/$id", array_merge($request->toArray(), [
                    '_method'   => 'PUT',
                ]));

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully updated permission');
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyRequest $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->delete(env('API_BASE_URL') . "/menus/permissions/$id");

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully deleted permission');
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }
}
