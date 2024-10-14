import './style.css';
import React, { useEffect, useState } from 'react';
import Str from '../../utilities/StringHelper';

function Modal(props) {
    const {
        children, className, onClose, onShow, show, wrapperClassName, ...attrs
    } = props;
    const [showMe, setShowMe] = useState(show);

    const closeHandle = (event) => {
        if (onClose) onClose();
        setShowMe(false);
    };

    const showHandle = () => {
        if (onShow) onShow();
    };

    useEffect(() => {
        if (new Boolean(show)) showHandle();
        setShowMe(show);
    }, [show]);

    return (
        <div
            onClick={closeHandle}
            className={Str.joinClassName(
                'wrapper-modal-component',
                showMe || 'wrapper-modal-component--hide',
                wrapperClassName,
            )}
        >
            <section
                {...attrs}
                onClick={(e) => e.stopPropagation()}
                className={Str.joinClassName('modal-component', className)}
            >
                {children}
            </section>
        </div>
    );
}

export default Modal;
