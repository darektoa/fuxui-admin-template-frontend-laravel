<?php

namespace App\Http\Controllers\Web\V1\Auth;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SignInController extends Controller
{
    public function index()
    {
        return Inertia::render('Routes');
    }


    public function store(Request $request)
    {
        try  {
            $user = AuthHelper::attempt([
                'username'  => $request->username,
                'password'  => $request->password,
            ]);

            return redirect()->route('home.index');

        } catch (RequestException $exception) {
            Session::flush();
            return redirect()->route('login');

        } catch (\Exception $exception) {
            return back()
                ->withInput();
        }
    }
}
