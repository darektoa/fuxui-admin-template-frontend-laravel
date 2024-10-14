import './style.css';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Alert from '@/components/Alert';

function ChangePassword() {
    const { CSRF_TOKEN, errors, flash } = usePage().props;

    const isError = typeof errors === 'string';

    return (
        <main className="scrollbar-thin flex h-full w-full flex-col items-center justify-start overflow-auto p-10">
            <form
                action="/changepassword"
                method="POST"
                className="w-[600px] max-w-lg"
            >
                <input
                    type="hidden"
                    name="_token"
                    value={CSRF_TOKEN}
                />
                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-4 text-lg font-bold">Change Password</h2>
                    <Alert
                        hidden={!isError}
                        className="mb-4 bg-red-200 text-red-600"
                    >
                        {errors}
                    </Alert>
                    <Alert
                        hidden={!flash.message}
                        className="mb-4 bg-green-200 text-green-600"
                    >
                        {flash.message}
                    </Alert>
                    <p className="mb-2">
                        Old Password
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="password"
                        name="old_password"
                        required
                        placeholder="Please enter your old password . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <p className="mb-2">
                        New Password
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Please enter your new password . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <p className="mb-2">
                        Confirmation New Password
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="password"
                        name="confirm_password"
                        required
                        placeholder="Please enter your confirmation password . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                </Card>
                <Button
                    type="submit"
                    className="bg-primary-accent text-white"
                >
                    Save
                </Button>
            </form>
        </main>
    );
}

export default ChangePassword;
