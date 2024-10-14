import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Illustration(props) {
    const { className, path, ...attrs } = props;

    return (
        <div
            {...attrs}
            className={Str.joinClassName('illustration-component', className)}
            style={{ backgroundImage: `url('/illustrations/${path}')` }}
        />
    );
}

export default Illustration;
