<?php

namespace App\Http\Controllers\Web\V1\Menu;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Menu\{
    DestroyRequest,
    EditRequest,
    IndexRequest,
    ShowRequest,
    StoreRequest,
    UpdateRequest,
};
use Exception;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        try {
            $resMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus');
            $resDataMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/data/menus');

            $resMenus->throwIfClientError();
            $resMenus->throwIfServerError();
            $resDataMenus->throwIfClientError();
            $resDataMenus->throwIfServerError();

            $menus = $resMenus->object()->data;
            $dataMenus = $resDataMenus->object()->data;

            return Inertia::render('Routes', compact(
                'menus',
                'dataMenus',
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Display the specified resource.
     */
    public function edit(EditRequest $request, string $id)
    {
        try {
            $resMenu = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/menus/$id");
            $resMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus');
            $resDataMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/data/menus');

            $resMenu->throwIfClientError();
            $resMenu->throwIfServerError();
            $resMenus->throwIfClientError();
            $resMenus->throwIfServerError();
            $resDataMenus->throwIfClientError();
            $resDataMenus->throwIfServerError();

            $menu = $resMenu->object()->data;
            $menus = $resMenus->object()->data;
            $dataMenus = $resDataMenus->object()->data;

            return Inertia::render('Routes', compact(
                'menu',
                'menus',
                'dataMenus',
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $icon = $request->file('icon');
            $url = env('API_BASE_URL') . '/menus';
            $res = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
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

            return redirect()
                ->route('menus.index')
                ->with('success', 'Successfully created menu');
        } catch (RequestException $exception) {
            Session::flush();
            return redirect()->route('login');
        } catch (\Exception $exception) {
            return back()
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest $request, string $id)
    {
        try {
            $resMenu = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/menus/$id");
            $resMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus');
            $resDataMenus = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/data/menus');

            $resMenu->throwIfClientError();
            $resMenu->throwIfServerError();
            $resMenus->throwIfClientError();
            $resMenus->throwIfServerError();
            $resDataMenus->throwIfClientError();
            $resDataMenus->throwIfServerError();

            $menu = $resMenu->object()->data;
            $menus = $resMenus->object()->data;
            $dataMenus = $resDataMenus->object()->data;

            return Inertia::render('Routes', compact(
                'menu',
                'menus',
                'dataMenus',
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->asMultipart()
                ->post(env('API_BASE_URL') . "/menus/$id", array_merge($request->toArray(), [
                    '_method'   => 'PUT',
                ]));

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully updated menu');
        } catch (Exception $e) {
            dd($e->getMessage());
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyRequest $request, string $menuId)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->delete(env('API_BASE_URL') . "/menus/$menuId");

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully deleted menu');
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }
}
