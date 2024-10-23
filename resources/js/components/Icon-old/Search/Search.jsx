import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Search(props) {
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
                cx="11"
                cy="11"
                r="8"
            />
            <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
            />
        </svg>
    );
}

export default Search;
