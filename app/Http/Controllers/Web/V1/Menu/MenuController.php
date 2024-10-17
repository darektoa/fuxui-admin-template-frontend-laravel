<?php

namespace App\Http\Controllers\Web\V1\Menu;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function store(Request $request)
    {
        try {
            $icon = $request->file('icon');
            $url = env('API_BASE_URL') . '/menus';
            $res = Http::withAuthToken()
                ->asMultipart()
                ->attach(
                    'icon',
                    $icon->getContent(),
                    $icon->getClientOriginalName(),
                )
                ->post($url, [
                    'name'          => $request->name,
                    'codename'      => $request->codename,
                    'uri'           => $request->uri,
                    'isExternalUri' => $request->isExternalUri,
                    'description'   => $request->description,
                    'tooltip'       => $request->tooltip,
                    'depth'         => $request->depth,
                    'order'         => $request->order,
                ]);

            $res->throwIfClientError();
            $res->throwIfServerError();

            return Inertia::render('Routes');

        } catch (RequestException $exception) {
            Session::flush();
            return redirect()->route('login');

        } catch (\Exception $exception) {
            return back()
                ->withInput();
        }
    }
}
