import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Plus(props) {
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
            <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
            />
            <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
            />
        </svg>
    );
}

export default Plus;
