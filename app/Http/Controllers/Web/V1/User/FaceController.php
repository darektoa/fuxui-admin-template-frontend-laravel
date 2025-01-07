<?php

namespace App\Http\Controllers\Web\V1\User;

use App\Exceptions\ResponseException;
use App\Helpers\Http;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env('API_BASE_URL') . '/users/faces');

            $response->throwIfClientError();
            $response->throwIfServerError();

            return response()->json(
                $response->object()
            );
        } catch (ResponseException $exception) {
            return ResponseHelper::error($exception);
        }
    }
}
