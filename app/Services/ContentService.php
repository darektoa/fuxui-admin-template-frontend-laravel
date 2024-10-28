<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ContentService {
    public function get(?Request $request=null)
    {
        try {
            $response = Http::acceptJson()
                ->when(!empty($request?->all()), fn($http) => (
                    $http->withQueryParameters($request->all())
                ))
                ->get(env('API_BASE_URL') . '/contents');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $data = $response->object()->data;

            return $data;
        } catch(Exception $e) {
            return null;
        }
    }
}
