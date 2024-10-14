import './style.css';
import React, { useEffect, useState } from 'react';
import Str from '../../utilities/StringHelper';

function Toast(props) {
    const {
        children, className, duration, onHide, show, value, ...attrs
    } = props;
    const [showMe, setShowMe] = useState(show);

    useEffect(() => {
        setShowMe(show);
        if (show) {
            setTimeout(() => {
                setShowMe(false);
                onHide?.();
            }, duration);
        }
    }, [show]);

    return (
        <section
            {...attrs}
            className={Str.joinClassName('toast-component', className, showMe || 'toast-component--hide')}
        >
            {children || value}
        </section>
    );
}

export default Toast;
