import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Box(props) {
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
            icon-name="box"
            data-lucide="box"
            className={Str.joinClassName('lucide lucide-box', className)}
        >
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line
                x1="12"
                y1="22.08"
                x2="12"
                y2="12"
            />
        </svg>
    );
}

export default Box;
