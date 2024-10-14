import './style.css';
import { Link } from 'react-router-dom';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Card from '@/components/Card';

function Maintenance() {
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
                <header className="pb-6 text-center border-b">
                    <h1 className="text-2xl text-center font-bold">
                        Page Under Maintenance
                    </h1>
                    <small className="text-center">
                        Halaman sedang dalam pembaharuan
                    </small>
                </header>
                <section className="pt-6">
                    <p className="text-center">
                        Mohon maaf atas ketidaknyamanannya. 🥲
                        <br />
                        <br />
                        Halaman akan segera kembali di jam
                        <span className="text-green-600"> 16.00 WIB</span>
                        .
                        <br />
                        Silakan coba kunjungi halaman ini kembali di waktu tersebut.
                        <br />
                        Terimakasihhh. 😊
                    </p>
                </section>
            </Card>
        </main>
    );
}

export default Maintenance;
