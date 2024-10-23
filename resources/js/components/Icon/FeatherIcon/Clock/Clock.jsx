import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Check(props) {
    const { className, ...attrs } = props;

    return (
        <svg
            {...attrs}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={Str.joinClassName('feather-icon', className)}
        >
            <circle
                cx="12"
                cy="12"
                r="10"
            />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

export default Check;
