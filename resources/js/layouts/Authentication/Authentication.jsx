import './style.css';
import { Outlet } from 'react-router-dom';
import React from 'react';

function Authentication(props) {
    return (
        <section className="authentication-layout">
            <Outlet />
        </section>
    );
}

export default Authentication;
