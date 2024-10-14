import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';
import Visibility from '../Visibility';

function Button(props) {
    const {
        children, className, hidden, value, ...attrs
    } = props;

    return (
        <Visibility hidden={hidden}>
            <button
                {...attrs}
                className={Str.joinClassName('button-component', className)}
            >
                {children || value}
            </button>
        </Visibility>
    );
}

export default Button;
