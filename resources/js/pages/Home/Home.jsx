import './style.css';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Alert from '@/components/Alert';
import Card from '@/components/Card';
import Section from '@/components/Section';
import Visibility from '@/components/Visibility';
import Partial from './partials';

function Home() {
    const { summary, user } = usePage().props;

    return (
        <main className="flex w-full flex-col py-6">
            <Alert
                className="flex w-full max-w-lg flex-col bg-red-200 p-10 text-red-600"
                hidden={user?.status?.id === 2 || user?.role?.id === 2}
            >
                <h2 className="mb-4 text-xl font-bold text-inherit">Halaman Dasboard</h2>
                <p className="text-inherit">
                    Halaman dashboard hanya bisa diakses ketika permintaan
                    kamu sebagai affiliator telah disetujui oleh admin kami.
                </p>
            </Alert>

            <Section
                className="mb-4 flex w-full items-start gap-6"
                hidden={user?.role?.id !== 2}
            >
                <Card className="w-full max-w-xs border-l-2 border-blue-600 bg-blue-50 text-blue-600">
                    <h2 className="mb-3 font-bold text-inherit">Affiliator Register</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {(summary?.affiliator?.total - summary?.affiliator?.unavailable) ?? '-'}
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-yellow-600 bg-yellow-50 text-yellow-600">
                    <h2 className="mb-3 font-bold text-inherit">On Review</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {summary?.affiliator?.pending ?? '-'}
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-red-600 bg-red-50 text-red-600">
                    <h2 className="mb-3 font-bold text-inherit">On Hold</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {summary?.affiliator?.on_hold ?? '-'}
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-green-600 bg-green-50 text-green-600">
                    <h2 className="mb-3 font-bold text-inherit">Approved</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {summary?.affiliator?.approved ?? '-'}
                    </p>
                </Card>
            </Section>

            <Section
                className="mb-4 flex w-full items-start gap-6"
                hidden={user?.status?.id !== 2 || user?.role?.id !== 3}
            >
                <Card className="w-full max-w-xs  border-l-2 border-blue-600 bg-blue-50 text-blue-600">
                    <h2 className="mb-3 font-bold text-inherit">Total Transaction</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {summary?.transaction?.total}
                    </p>
                </Card>
            </Section>

            <Visibility hidden={user?.status?.id !== 2 && user?.role?.id !== 2}>
                <Partial.TransactionList />
            </Visibility>
        </main>
    );
}

export default Home;
