import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Icon(props) {
    const { className, path, ...attrs } = props;

    return (
        <div
            {...attrs}
            className={Str.joinClassName('icon-component', className)}
            style={{ backgroundImage: `url('/icons/${path}')` }}
        />
    );
}

export default Icon;
