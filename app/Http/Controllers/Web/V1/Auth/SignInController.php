<?php

namespace App\Http\Controllers\Web\V1\Auth;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SignInController extends Controller
{
    public function index()
    {
        $auth = AuthHelper::attempt([
            'email'     => 'user@example.com',
            'password'  => 'Password123;'
        ]);

        dd($auth, AuthHelper::user(), Session::all());

        return Inertia::render('Routes');
    }
}
