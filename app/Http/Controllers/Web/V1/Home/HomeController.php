<?php

namespace App\Http\Controllers\Web\V1\Home;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        try {

            return Inertia::render('Routes');
        } catch(Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }
}
