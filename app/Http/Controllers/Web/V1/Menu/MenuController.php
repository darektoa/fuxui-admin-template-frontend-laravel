<?php

namespace App\Http\Controllers\Web\V1\Menu;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
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
    public function index(Request $request)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $menus = $response->object()->data;

            return Inertia::render('Routes', compact(
                'menus'
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
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

            return redirect()
                ->route('menus.index')
                ->with('success', 'Successfully created user');

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
    public function show(string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/menus');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $menus = $response->object()->data;

            return Inertia::render('Routes', compact(
                'menus'
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->asMultipart()
                ->post(env('API_BASE_URL') . "/menus/$id", array_merge($request->toArray(), [
                    '_method'   => 'PUT',
                ]));

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back();
        } catch(Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $menuId)
    {
        try {
            $response = Http::withAuthToken()
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
