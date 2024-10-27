<?php

namespace App\Http\Controllers\Web\V1\Menu\Permission;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeController extends Controller
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
