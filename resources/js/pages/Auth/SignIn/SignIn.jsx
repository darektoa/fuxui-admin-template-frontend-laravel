import './style.css';
import { Link } from 'react-router-dom';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Card from '@/components/Card';

function SignIn() {
    const {
        CSRF_TOKEN
    } = usePage().props;


    return (
        <main className="flex h-full w-full flex-col items-center justify-center p-10">
            <Card className="w-full max-w-xl">
                <header>
                    <h1 className="text-center text-2xl font-bold">Sign In</h1>
                    <p className="mb-6 text-center text-gray-600">Fuxui Template</p>
                </header>
                <section>
                    <form
                        action="/signIn"
                        method="POST"
                        className="flex flex-col items-center"
                    >
                        <input
                            type="text"
                            name="username"
                            className="mb-4 w-full input input-bordered"
                            placeholder="Email"
                            defaultValue={''}
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            className="mb-4 w-full input input-bordered"
                            placeholder="Password"
                        />
                        <input
                            type="hidden"
                            name="_token"
                            value={CSRF_TOKEN}
                        />
                        <Button
                            type="submit"
                            className="mb-4 w-full btn btn-primary"
                        >
                            Sign In
                        </Button>
                        <p>
                            Doesn't have an account?
                            {' '}
                            <Link
                                to="/sign-up"
                                className="underline"
                            >
                                sign up here
                            </Link>
                        </p>
                        <p>
                            Forgot password?
                            {' '}
                            <Link
                                to="/forgot-password"
                                className="underline"
                            >
                                click here
                            </Link>
                        </p>
                    </form>
                </section>
            </Card>
        </main>
    );
}

export default SignIn;
