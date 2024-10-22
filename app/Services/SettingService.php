<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;

class SettingService {
    public function get()
    {
        try {
            $response = Http::acceptJson()
                ->get(env('API_BASE_URL') . '/setting');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $data = $response->object()->data;

            return $data;
        } catch(Exception $e) {
            return null;
        }
    }
}
