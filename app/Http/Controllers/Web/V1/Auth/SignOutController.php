<?php

namespace App\Http\Controllers\Web\V1\Auth;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SignOutController extends Controller
{
    public function destroy(Request $request)
    {
        try {
            AuthHelper::logout();

            return redirect()->route('sign-in.index');
        } catch(Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }
}
