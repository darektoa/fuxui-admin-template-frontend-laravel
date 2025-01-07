<?php

namespace App\Http\Controllers\Web\V1\Log;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Log\Activity\IndexRequest;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(IndexRequest $request)
    {
        try {
            $asJSON = $request->asJSON;
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env('API_BASE_URL') . '/logs/activities');

            $response->throwIfClientError();
            $response->throwIfServerError();

            if ($asJSON)
                return response()->json($response->object());

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
