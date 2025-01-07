<?php

namespace App\Http\Controllers\Web\V1\Setting\Security;

use App\Helpers\Http;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaceSignInController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $asJSON = $request->asJSON;
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->withQueryParameters($request->all())
                ->get(env('API_BASE_URL') . '/profile/faces');

            $response->throwIfClientError();
            $response->throwIfServerError();

            if ($asJSON)
                return response()->json($response->object());

            $activities = $response->object()->data;

            return Inertia::render('Routes', compact(
                'activities'
            ));
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Routes');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $image = $request->file('image');
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->asMultipart()
                ->attach(
                    'image',
                    $image->getContent(),
                    $image->getClientOriginalName() . "." . $image->getClientOriginalExtension()
                )
                ->post(env('API_BASE_URL') . '/profile/faces/', [
                    'name'  => $request->name,
                    'isActive'  => $request->isActive,
                ]);

            $response->throwIfClientError();
            $response->throwIfServerError();

            return redirect()
                ->back()
                ->with('success', 'Successfully add face for sign-in');
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $userId)
    {
        try {
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->delete(env('API_BASE_URL') . "/profile/faces/$userId");

            $response->throwIfClientError();
            $response->throwIfServerError();

            return back()
                ->with('success', 'Successfully deleted face for sign-in');
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }
}
