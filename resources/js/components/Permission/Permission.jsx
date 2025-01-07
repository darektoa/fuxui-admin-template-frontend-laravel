import './style.css';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Visibility from '../Visibility';
import isAuthorized from '@/utilities/isAuthorized'

function Permission(props) {
    const { userPermissions } =usePage().props;
    const { children, ignore, permissions } = props;

    return (
        <Visibility hidden={!ignore && !isAuthorized(userPermissions, permissions)}>
            {children}
        </Visibility>
    );
}

export default Permission;
