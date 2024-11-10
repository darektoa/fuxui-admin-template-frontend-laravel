<?php

namespace App\Http\Controllers\Web\V1\Log;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env('API_BASE_URL') . '/logs/activities');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $activities = $response->object()->data;

            return Inertia::render('Routes', compact(
                'activities'
            ));
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }
}
