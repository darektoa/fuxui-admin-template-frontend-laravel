<?php

namespace App\Services;

use App\Helpers\Http;
use Exception;

class MenuService
{
    public function get()
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent(request()->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $data = $response->object()->data;

            return $data;
        } catch (Exception $e) {
            return null;
        }
    }
}
