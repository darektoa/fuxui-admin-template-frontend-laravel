import './style.css';
import { useNavigate } from 'react-router-dom';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Card from '@/components/Card';

function Success() {
    const { inputs } = usePage().props;
    const navigate = useNavigate();

    if (!inputs.email) navigate('/sign-up');

    return (
        <main className="flex h-full w-full max-w-lg flex-col items-center justify-start overflow-auto bg-white px-4 py-10 sm:p-10">
            <Card className="mb-4 flex w-full flex-col border-t-4 border-t-green-600 bg-green-50">
                <h2 className="mb-1 text-2xl font-bold">Registration Success</h2>
                <p className="mb-4 text-base text-slate-500">
                    Data successfully sent. Please check your email
                    {' '}
                    <b>{inputs?.email}</b>
                    {' '}
                    for activation account!
                </p>
            </Card>
        </main>
    );
}

export default Success;
