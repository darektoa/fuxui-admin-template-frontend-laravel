import './style.css';
import { Link } from 'react-router-dom';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Card from '@/components/Card';

function ForgotPassword() {
    const {
        CSRF_TOKEN, errors, inputs, flash,
    } = usePage().props;

    return (
        <main className="flex h-full w-full flex-col items-center justify-center p-10">
            <Alert
                hidden={typeof errors !== 'string'}
                className="mb-4 w-full max-w-xl bg-red-200 text-red-600"
            >
                {errors}
            </Alert>
            <Alert
                hidden={!flash.message}
                className="mb-4 w-full max-w-xl bg-green-200 text-green-600"
            >
                {flash.message}
            </Alert>

            <Card className="w-full max-w-xl">
                <header>
                    <h1 className="mb-6 text-2xl font-bold">Forgot Password</h1>
                </header>
                <section>
                    <form
                        action="/forgot-password"
                        method="POST"
                    >
                        <input
                            type="text"
                            name="email"
                            className="mb-4 w-full rounded-md bg-gray-100 px-4 py-2"
                            placeholder="Email"
                            defaultValue={inputs?.email}
                            autoFocus
                        />
                        <input
                            type="hidden"
                            name="_token"
                            value={CSRF_TOKEN}
                        />
                        <div className="flex items-center justify-between">
                            <Button
                                type="submit"
                                className="bg-primary-accent text-white"
                            >
                                Submit
                            </Button>
                            <span>
                                Remember your account back?
                                {' '}
                                <Link
                                    to="/sign-in"
                                    className="underline"
                                >
                                    sign in here
                                </Link>
                            </span>
                        </div>
                    </form>
                </section>
            </Card>
        </main>
    );
}

export default ForgotPassword;
