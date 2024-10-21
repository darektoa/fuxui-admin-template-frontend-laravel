import './style.css';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import Partial from './partials';

function User() {
    const {
        errors,
        flash,
    } = usePage().props;

    return (
        <main className="flex w-full gap-6 py-6">
            {/* <Partial.UserList />

            <Partial.ModalError
                show={show.error}
                data={errors}
                onClose={() => setShow((states) => ({ ...states, error: false }))}
            />

            <Partial.ModalSuccess
                show={show.success}
                data={flash.success}
                onClose={() => setShow((states) => ({ ...states, success: false }))}
            /> */}
        </main>
    );
}

export default User;
