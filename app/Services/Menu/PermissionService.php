<?php

namespace App\Services\Menu;

use App\Helpers\Http;
use Exception;
use Illuminate\Http\Request;

class PermissionService
{
    public function get(?Request $request = null)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent(request()->userAgent())
                ->acceptJson()
                ->when($request->collect()->isNotEmpty(), fn($http) => (
                    $http->withQueryParameters($request->all())
                ))
                ->get(env("API_BASE_URL") . "/profile/permissions");

            $response->throwIfClientError();
            $response->throwIfServerError();

            $data = $response->object()->data;

            return $data;
        } catch (Exception $e) {
            return null;
        }
    }
}
