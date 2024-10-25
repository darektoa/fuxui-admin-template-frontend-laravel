<?php

namespace App\Http\Controllers\Web\V1\Content;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/contents');

            $response->throwIfClientError();
            $response->throwIfServerError();

            $contents = $response->object()->data;

            return Inertia::render('Routes', compact(
                'contents'
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->acceptJson()
                ->post(env('API_BASE_URL') . "/contents/$id", [
                    '_method'   => 'PUT',
                ]);

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
