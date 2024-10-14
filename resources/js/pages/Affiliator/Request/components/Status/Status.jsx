import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Status(props) {
    const {
        className, children, code, value, ...attrs
    } = props;
    const colors = {
        1: 'text-yellow-500',
        2: 'text-green-500',
        3: 'text-red-500',
    };

    return (
        <span
            {...attrs}
            className={Str.joinClassName(colors[code], className)}
        >
            {children || value}
        </span>
    );
}

export default Status;
