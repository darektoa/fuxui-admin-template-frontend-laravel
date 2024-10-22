import './style.css';
import React, { cloneElement, isValidElement, useEffect, useRef } from 'react';

const Ripple = ({ children }) => {
    const childrenRef = useRef();


    if(! isValidElement(children)) return (
        <div ref={childrenRef}>
            { children }
        </div>
    )

    return cloneElement(children, { ref: childrenRef, onClick: () => {
        console.log('test');
    }});
}

export default Ripple;
