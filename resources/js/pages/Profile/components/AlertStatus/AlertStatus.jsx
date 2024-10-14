import './style.css';
import React from 'react';
import Alert from '@/components/Alert';
import Str from '@/utilities/StringHelper';
import statusClassName from './statusClassName';

function AlertStatus(props) {
    const {
        children, className, status, ...attrs
    } = props;

    return (
        <Alert
            {...attrs}
            className={Str.joinClassName('profile-page__alert-status-component', statusClassName[status], className)}
        >
            {children}
        </Alert>
    );
}

export default AlertStatus;
