<?php

namespace App\Helpers;

use App\Exceptions\ResponseException;
use App\Services\StaticService;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\{Http, Session};
use Illuminate\Support\Facades\Auth;

class AuthHelper {
    /**
     * Attempt to login with an access token from API
     *
     * @param array|\Illuminate\Support\Collection $credentials
     * @return object
     */
    public static function attempt($crendentials): object
    {
        $endpoint   = env('API_BASE_URL') . '/oauth/token';
        $response   = Http::acceptJson()
            ->asJson()
            ->post($endpoint, collect($crendentials)->merge([
                'grant_type'    => 'password',
                'client_id'     => env('API_OAUTH_CLIENT_ID'),
                'client_secret' => env('API_OAUTH_CLIENT_SECRET'),
                'scope'         => '',
            ])->toArray());

        if($response->serverError()) throw new ResponseException(
            'Server Error', $response->status()
        );

        if($response->badRequest()) {
            $res     = $response->object();
            $message = $res->message ?? 'Account didn\'t match';
            $code    = $res->code ?? 404;
            throw new ResponseException($message, $code, $res);
        };

        $data = (object) CollectionHelper::camelKeys($response->json())->toArray();
        Session::put('token', $data);

        return $data;
    }


    /**
     * Logout the current logged in user
     *
     * @return bool
     */
    public static function logout(): bool
    {
        Session::remove('token');
        Session::remove('user');
        return true;
    }


    /**
     * Get authenticated user
     *
     * @return object|null
     */
    public static function user(): object | null
    {
        $user = Session::get("user");

        if($user != null)
            return (object) $user;

        if(! AuthHelper::isLoggedIn())
            throw new ResponseException('Unauthorized', 403);

        $token      = AuthHelper::token();
        $endpoint   = env('API_BASE_URL') . '/profile';
        $response   = Http::acceptJson()
            ->asJson()
            ->withToken(
                token: $token->accessToken ?? null,
                type: $token->tokenType ?? null,
            )
            ->get($endpoint);

        $response->throwIfClientError();
        $response->throwIfServerError();

        $data = $response->object()->data;
        Session::put('user', $data);

        return $data;
    }


    /**
     * Get token object of authenticated user
     *
     * @return object|null
     */
    public static function token(): object | null
    {
        $token = Session::get("token");

        return (object) $token ?? null;
    }


    /**
     * Get access token of authenticated user
     *
     * @return string|null
     */
    public static function accessToken(): string | null
    {
        $token = Session::get("token");

        return $token->accessToken ?? null;
    }


    /**
     * Check if the user is logged in
     *
     * @return bool
     */
    public static function isLoggedIn(): bool
    {
        if(! AuthHelper::accessToken()) {
            throw new ResponseException('Unauthorized', 401);
            return false;
        }

        return true;
    }
}
