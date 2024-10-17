import './style.css';
import { usePage } from '@inertiajs/react';
import React from 'react';
import imageBrandLogo from '@/assets/images/brand-logo.svg';


function SignIn() {
    const {
        CSRF_TOKEN
    } = usePage().props;


    return (
        <main className="flex h-full min-h-dvh w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
                <main className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="flex w-full items-center justify-center p-6 sm:p-12">
                        <form
                            className="w-full"
                            method="POST"
                            action="/sign-in">
                            <div className="mb-4 flex items-center text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                <figure className="mr-2 bg-inherit p-2">
                                    <img
                                        src={imageBrandLogo}
                                        alt="Brand Logo"
                                        className="w-ful mx-auto object-contain mb-1"
                                    />
                                </figure>
                                <h1 className="">
                                    Sign-in
                                    <span className="block text-sm font-normal opacity-80">
                                        <span>Welcome to </span>
                                        <span className="text-blue-600">Fuxui Dashboard</span>
                                    </span>
                                </h1>
                            </div>

                            <input type="hidden" name="_token" value={CSRF_TOKEN} />

                            <label className="form-control mb-2 w-full">
                                <div className="label">
                                    <span className="label-text">
                                        Username
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username . . ."
                                    className="input input-bordered w-full" />
                            </label>

                            <label className="form-control mb-2 w-full">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password . . ."
                                    className="input input-bordered w-full" />
                            </label>

                            <button
                                type="submit"
                                className="btn btn-ghost bg-blue-600 text-white mt-4 w-full">
                                Submit
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </main>
    );
}

export default SignIn;
