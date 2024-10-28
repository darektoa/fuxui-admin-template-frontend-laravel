import './style.css';
import { Outlet } from 'react-router-dom';
import { useFavicon, useWebTitle } from '@/hooks';
import { usePage } from '@inertiajs/react';
import React from 'react';

function Authentication(props) {
    const { appContents } = usePage().props;

    useWebTitle(appContents['appWebTitle']?.value);
    useFavicon(appContents['appFavicon']?.value);

    return (
        <section className="authentication-layout">
            <Outlet />
        </section>
    );
}

export default Authentication;
