<?php

namespace App\Http\Controllers\Web\V1\Content;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/contents/types');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $contentTypes = $response->object()->data;

            return Inertia::render('Routes', compact(
                'contentTypes'
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
            $response = Http::withAuthToken()
                ->acceptJson()
                ->withBody($request->toArray())
                ->post(env('API_BASE_URL') . '/contents/types');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $contentTypes = $response->object()->data;

            return Inertia::render('Routes', compact(
                'contentTypes'
            ));
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
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
                ->get(env('API_BASE_URL') . '/contents/types');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $contentTypes = $response->object()->data;

            return Inertia::render('Routes', compact(
                'contentTypes'
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
                ->post(env('API_BASE_URL') . "/contents/types/$id", array_merge($request->toArray(), [
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
    public function destroy(string $id)
    {
        //
    }
}
