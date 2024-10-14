import './style.css';
import { usePage } from '@inertiajs/react';
import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Card from '@/components/Card';

function ResetPassword() {
    const { CSRF_TOKEN, errors, flash } = usePage().props;
    const { token } = useParams();
    const [searcParams] = useSearchParams();
    const email = searcParams.get('email');

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
                    <h1 className="mb-6 text-2xl font-bold">Change Your Password</h1>
                </header>
                <section>
                    <form
                        action="/reset-password"
                        method="POST"
                    >
                        <input
                            type="password"
                            name="password"
                            className="mb-4 w-full rounded-md bg-gray-100 px-4 py-2"
                            placeholder="New Password . . ."
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password_confirmation"
                            className="mb-4 w-full rounded-md bg-gray-100 px-4 py-2"
                            placeholder="Confirm New Password . . ."
                        />
                        <input
                            type="hidden"
                            name="email"
                            value={email}
                        />
                        <input
                            type="hidden"
                            name="token"
                            value={token}
                        />
                        <input
                            type="hidden"
                            name="_token"
                            value={CSRF_TOKEN}
                        />
                        <Button
                            type="submit"
                            className="bg-primary-accent text-white"
                        >
                            Save
                        </Button>
                    </form>
                </section>
            </Card>
        </main>
    );
}

export default ResetPassword;
