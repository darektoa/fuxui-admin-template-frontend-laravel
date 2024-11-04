<?php

namespace App\Http\Controllers\Web\V1\User;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/users');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $users = $response->object()->data;

            return Inertia::render('Routes', compact(
                'users'
            ));
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function create()
    {
        try {
            $response = Http::withAuthToken()
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
    

    public function edit(string $userId)
    {
        try {
            $userRes = Http::withAuthToken()
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/users/$userId");

            $rolesRes = Http::withAuthToken()
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/users/roles');

            $userRes->throwIfClientError();
            $userRes->throwIfServerError();
            $rolesRes->throwIfClientError();
            $rolesRes->throwIfServerError();

            $user = $userRes->object()->data;
            $roles = $rolesRes->object()->data;

            return Inertia::render('Routes', compact(
                'user',
                'roles'
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
                ->acceptJson()
                ->post(env('API_BASE_URL') . '/users', [
                    "roleId"        => $request->roleId,
                    "email"         => $request->email,
                    "username"      => $request->username,
                    "password"      => "Password123#",
                    "firstname"     => $request->firstname,
                    "lastname"      => $request->lastname,
                    "birthDate"     => $request->birthDate,
                    "birthPlace"    => $request->birthPlace,
                    "phoneNumber"   => $request->phoneNumber,
                ]);

            $response->throwIfClientError();
            $response->throwIfServerError();

            return redirect()
                ->route('users.index')
                ->with('success', 'Successfully created user');
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function update(Request $request, string $userId)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->post(env('API_BASE_URL') . "/users/$userId", [
                    "_method"       => "PATCH",
                    "roleId"        => $request->roleId,
                    "email"         => $request->email,
                    "username"      => $request->username,
                    "firstname"     => $request->firstname,
                    "lastname"      => $request->lastname,
                    "birthDate"     => $request->birthDate,
                    "birthPlace"    => $request->birthPlace,
                    "phoneNumber"   => $request->phoneNumber,
                ]);

            $response->throwIfClientError();
            $response->throwIfServerError();

            return redirect()
                ->route('users.index')
                ->with('success', 'Successfully updated user');
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }


    public function destroy(Request $request, string $userId)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->delete(env('API_BASE_URL') . "/users/$userId");

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully deleted user');
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }
}
