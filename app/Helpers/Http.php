<?php

namespace App\Helpers;

use App\Traits\StaticableMethods;
use Illuminate\Support\Facades\Http as FacadesHttp;
use Illuminate\Support\Facades\Session;

/**
 * @method static \App\Helpers\Http withAuthToken()
 */
class Http extends FacadesHttp
{
    use StaticableMethods;

    /**
     * Add the Authorization header with logged-in session token to the request.
     *
     * @return $this
     */
    protected function withAuthToken() {
        $token = Session::get('access_token');
        return FacadesHttp::withHeader('Authorization', "Bearer $token");
    }
}
