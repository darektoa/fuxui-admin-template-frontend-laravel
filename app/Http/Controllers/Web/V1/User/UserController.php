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
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
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
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }


    public function store(Request $request)
    {
        try {
            dd($request->all());
            $response = Http::withAuthToken()
                ->acceptJson()
                ->post(env('API_BASE_URL') . '/users', [
                    "roleId"        => $request->roleId,
                    "email"         => $request->email,
                    "username"      => $request->username,
                    "password"      => "Password123",
                    "firstname"     => $request->firstname,
                    "lastname"      => $request->lastname,
                    "birthDate"     => $request->birthDate,
                    "birthPlace"    => $request->birthPlace,
                    "phoneNumber"   => $request->phoneNumber,
                ]);

            $response->throwIfClientError();
            $response->throwIfServerError();

            $users = $response->object()->data;

            return Inertia::render('Routes', compact(
                'users'
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }
}
