import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Header(props) {
    const { children, className, ...attrs } = props;

    return (
        <header
            {...attrs}
            className={Str.joinClassName('header-component', className)}
        >
            {children}
        </header>
    );
}

export default Header;
