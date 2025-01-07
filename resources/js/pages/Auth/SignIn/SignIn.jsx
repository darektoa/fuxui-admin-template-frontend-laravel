import './style.css';
import { Card } from '@nextui-org/react';
import { FeatherIcon } from "@/components/Icon";
import { usePage } from '@inertiajs/react';
import React from 'react';

function SignIn() {
    const {
        appContents,
        CSRF_TOKEN,
        setting,
    } = usePage().props;

    return (
        <main className="w-full h-dvh flex flex-col items-center justify-center overflow-y-auto md:flex-row">
            <Card
                as="form"
                className="w-full grid grid-cols-12 gap-1 max-w-lg p-6 sm:p-12"
                method="POST"
                action="/sign-in"
            >
                <div className="col-span-12 mb-4 flex items-center text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    <figure className="mr-2 bg-inherit p-2 size-20">
                        <img
                            src={appContents['appLogo']?.value}
                            alt="Brand Logo"
                            className="w-full h-full mx-auto object-contain mb-1"
                        />
                    </figure>
                    <h1 className="">
                        {appContents['authSignInHeading1']?.value}
                        <span className="block text-sm font-normal opacity-80">
                            <span>{appContents['appTagline']?.value}</span>
                        </span>
                    </h1>
                </div>

                <input type="hidden" name="_token" value={CSRF_TOKEN} />

                <label className="col-span-12 form-control mb-2 w-full">
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

                <label className="col-span-12 form-control mb-2 w-full">
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
                    className="col-span-11 btn btn-primary text-white mt-4 w-full">
                    {appContents['authSignInBtnLoginText']?.value}
                </button>
                <a
                    href="/sign-in/face"
                    className="col-span-1 btn btn-primary text-white mt-4 p-1 aspect-square">
                    <FeatherIcon.Smile className="size-5" />
                </a>
            </Card>
        </main>
    );
}

export default SignIn;
