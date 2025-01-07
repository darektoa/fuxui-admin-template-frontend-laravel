<?php

namespace App\Http\Controllers\Web\V1\Profile;

use App\Helpers\AuthHelper;
use App\Helpers\Http;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Profile\{
    EditRequest,
    ShowRequest,
    UpdateRequest,
};
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Show the form for creating the resource.
     */
    public function create(): never
    {
        abort(404);
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(Request $request): never
    {
        abort(404);
    }

    /**
     * Display the resource.
     */
    public function show(ShowRequest $request)
    {
        try {
            $profileRes = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/profile");

            $profileRes->throwIfClientError();
            $profileRes->throwIfServerError();

            $profile = $profileRes->object()->data;

            return Inertia::render('Routes', compact(
                'profile',
            ));
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(EditRequest $request)
    {
        try {
            $profileRes = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->get(env('API_BASE_URL') . "/profile");

            $profileRes->throwIfClientError();
            $profileRes->throwIfServerError();

            $profile = $profileRes->object()->data;

            return Inertia::render('Routes', compact(
                'profile',
            ));
        } catch (Exception $exception) {
            return redirect()
                ->route('sign-in.index')
                ->withErrors([$exception->getMessage()]);
        }
    }

    /**
     * Update the resource in storage.
     */
    public function update(UpdateRequest $request)
    {
        try {
            $profilePicts = $request->file('profilePictures');
            $response = Http::withAuthToken()
                ->withUserAgent($request->userAgent())
                ->acceptJson()
                ->asMultipart()
                ->when($profilePicts, function ($http) use ($profilePicts) {
                    foreach ($profilePicts as $profilePict) {
                        if (! $profilePict->isReadable()) return;

                        $http->attach(
                            'profilePictures[]',
                            $profilePict->getContent(),
                            $profilePict->getClientOriginalName(),
                        );
                    }
                })
                ->post(env("API_BASE_URL") . "/profile", [
                    "_method"       => "PATCH",
                    "email"         => $request->email,
                    "username"      => $request->username,
                    "firstname"     => $request->firstname,
                    "lastname"      => $request->lastname,
                    "birthDate"     => $request->birthDate,
                    "birthPlace"    => $request->birthPlace,
                    "phoneNumber"   => $request->phoneNumber,
                ]);

            $response->throwIfClientError();
            $response->throwIfServerError();

            return redirect()
                ->route("profile.edit")
                ->with("success", "Successfully updated profile");
        } catch (Exception $exception) {
            return redirect()
                ->back()
                ->withErrors([$exception->getMessage()]);
        }
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(): never
    {
        abort(404);
    }
}
