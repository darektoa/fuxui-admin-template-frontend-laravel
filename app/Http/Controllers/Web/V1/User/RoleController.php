<?php

namespace App\Http\Controllers\Web\V1\User;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\User\Role\{
    CreateRequest,
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

class RoleController extends Controller
{
    public function index(IndexRequest $request)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/users/roles');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $roles = $response->object()->data;

            return Inertia::render('Routes', compact(
                'roles'
            ));
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function create(CreateRequest $request)
    {
        try {
            return Inertia::render('Routes');
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function edit(EditRequest $request, string $roleId)
    {
        try {
            $roleRes = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/users/roles/$roleId");

            $menuPermRes = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/menus/permissions");

            $roleRes->throwIfClientError();
            $roleRes->throwIfServerError();
            $menuPermRes->throwIfClientError();
            $menuPermRes->throwIfServerError();

            $role = $roleRes->object()->data;
            $menuPermissions = $menuPermRes->object()->data;

            return Inertia::render('Routes', compact(
                'menuPermissions',
                'role',
            ));
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function store(Request $request)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->post(env('API_BASE_URL') . '/users/roles', [
                    "name"              => $request->name,
                    "codename"          => $request->codename,
                    "menuPermissions"   => $request->menuPermissions,
                ]);

            $response->throwIfClientError();
            $response->throwIfServerError();

            return redirect()
                ->route('users.roles.index')
                ->with('success', 'Successfully created role');
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function update(Request $request, string $roleId)
    {
        try {
            // dd($request->all());
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->post(env('API_BASE_URL') . "/users/roles/$roleId", [
                    "_method"           => "PUT",
                    "name"              => $request->name,
                    "codename"          => $request->codename,
                    "menuPermissions"   => $request->menuPermissions,
                ]);

            // dd($response->object());

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully updated role');;
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function destroy(Request $request, string $roleId)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->delete(env('API_BASE_URL') . "/users/roles/$roleId");

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully deleted role');
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }
}
