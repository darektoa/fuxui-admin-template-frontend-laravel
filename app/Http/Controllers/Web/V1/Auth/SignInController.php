<?php

namespace App\Http\Controllers\Web\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SignInController extends Controller
{
    public function index()
    {
        return Inertia::render('Routes');
    }
}
