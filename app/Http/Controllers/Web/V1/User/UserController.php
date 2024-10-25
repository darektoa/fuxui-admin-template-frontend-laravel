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
            return redirect()->route('sign-in.index');;
        }
    }
}
