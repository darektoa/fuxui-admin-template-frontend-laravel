import './style.css';
import React, { useEffect } from 'react';
import Str from '@/utilities/StringHelper';
import Visibility from '@/components/Visibility';

function Alert(props) {
    const {
        children, className, hidden, value, ...attrs
    } = props;

    return (
        <Visibility hidden={hidden}>
            <div
                {...attrs}
                className={Str.joinClassName('alert-component', className)}
            >
                {children || value}
            </div>
        </Visibility>
    );
}

export default Alert;
