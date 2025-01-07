<?php

namespace App\Http\Controllers\Web\V1\Content;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Content\Type\{
    DestroyRequest,
    EditRequest,
    IndexRequest,
    ShowRequest,
    StoreRequest,
    UpdateRequest,
};
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
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
     * Display the specified resource.
     */
    public function edit(EditRequest $request, string $id)
    {
        try {
            $resType = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/contents/types/$id");
            $resTypes = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . '/contents/types');

            $resType->throwIfClientError();
            $resType->throwIfServerError();
            $resTypes->throwIfClientError();
            $resTypes->throwIfServerError();

            $contentType = $resType->object()->data;
            $contentTypes = $resTypes->object()->data;

            return Inertia::render('Routes', compact(
                'contentType',
                'contentTypes'
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
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
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
    public function show(ShowRequest $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
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
    public function update(UpdateRequest $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->asMultipart()
                ->post(env('API_BASE_URL') . "/contents/types/$id", array_merge($request->toArray(), [
                    '_method'   => 'PUT',
                ]));

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully updated content type');;
        } catch (Exception $e) {
            return redirect()->route('sign-in.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyRequest $request, string $id)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->delete(env('API_BASE_URL') . "/contents/types/$id");

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully deleted content type');
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }
}
