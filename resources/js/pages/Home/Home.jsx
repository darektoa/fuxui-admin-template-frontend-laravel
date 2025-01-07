import './style.css';
import { Chart as ChartJS, ArcElement, CategoryScale, LineElement, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import Card from '@/components/Card';
import Section from '@/components/Section';
import Permission from '@/components/Permission';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
);

function Home() {
    const {
        appContents,
        menus,
        permissions,
        roles,
        user,
        users,
        usersChart,
    } = usePage().props;

    return (
        <main className="flex w-full flex-col py-6">

            <Section
                permissions="01JDKB58YQNTN1HHF0TBKVP670"
                className="mb-4 flex w-full items-start gap-6"
            >
                <Card className="w-full max-w-xs border-l-2 border-blue-600 bg-blue-50 text-blue-600">
                    <h2 className="mb-3 font-bold text-inherit">Total User</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {users?.length}
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-violet-600 bg-violet-50 text-violet-600">
                    <h2 className="mb-3 font-bold text-inherit">Total Menu</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {menus?.length}
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-sky-600 bg-sky-50 text-sky-600">
                    <h2 className="mb-3 font-bold text-inherit">Total Role</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {roles?.length}
                    </p>
                </Card>
                <Card className="w-full max-w-xs border-l-2 border-green-600 bg-green-50 text-green-600">
                    <h2 className="mb-3 font-bold text-inherit">Total Permission</h2>
                    <p className="text-5xl font-bold text-inherit">
                        {permissions?.length}
                    </p>
                </Card>
            </Section>

            <Section className="mb-4 flex w-full items-start gap-6" permissions="01JDKB58YQNTN1HHF0TBKVP671">
                <Line
                    datasetIdKey='id'
                    data={{
                        labels: usersChart?.labels ?? [],
                        datasets: [{
                            id: 1,
                            label: 'Users',
                            borderColor: 'border border-primary',
                            data: usersChart?.data ?? [],
                        }],
                    }}
                />
            </Section>
        </main>
    );
}

export default Home;
