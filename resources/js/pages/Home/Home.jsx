import './style.css';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Alert from '@/components/Alert';
import Card from '@/components/Card';
import Section from '@/components/Section';
import Visibility from '@/components/Visibility';
import Partial from './partials';

function Home() {
    const { user } = usePage().props;

    return (
        <main className="flex w-full flex-col py-6">

            <Section
                className="mb-4 flex w-full items-start gap-6"
            >
                <Card className="w-full max-w-xs border-l-2 border-blue-600 bg-blue-50 text-blue-600">
                    <h2 className="mb-3 font-bold text-inherit">Total User</h2>
                    <p className="text-5xl font-bold text-inherit">
                        3
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-violet-600 bg-violet-50 text-violet-600">
                    <h2 className="mb-3 font-bold text-inherit">Total Menu</h2>
                    <p className="text-5xl font-bold text-inherit">
                        1
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-sky-600 bg-sky-50 text-sky-600">
                    <h2 className="mb-3 font-bold text-inherit">Total Role</h2>
                    <p className="text-5xl font-bold text-inherit">
                        1
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-green-600 bg-green-50 text-green-600">
                    <h2 className="mb-3 font-bold text-inherit">Total Permission</h2>
                    <p className="text-5xl font-bold text-inherit">
                        1
                    </p>
                </Card>
            </Section>
        </main>
    );
}

export default Home;
