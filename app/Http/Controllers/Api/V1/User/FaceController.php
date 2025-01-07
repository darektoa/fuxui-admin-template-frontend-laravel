<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Exceptions\ResponseException;
use App\Helpers\Http;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        }  catch (\Exception $exception) {
            $code = $exception->getCode();

            return ResponseHelper::error(
                message: $exception->getMessage(),
                status: Response::$statusTexts[$code] ? $code : 500,
            );
        }
    }
}
