import './style.css';
import React, { cloneElement, isValidElement, useRef } from 'react';
import Str from '@/utilities/StringHelper';

const Ripple = ({ children }) => {
    const childrenRef = useRef(null);

    const onClickHandle = (event) => {
        ripple(event);
        children?.props?.onClick?.(event);
    }

    if(! isValidElement(children)) return (
        <div ref={childrenRef} onClick={ripple}>
            { children }
        </div>
    )

    return cloneElement(children, {
        ref: childrenRef,
        onClick: onClickHandle,
        className: Str.joinClassName("rippleParent", children?.props?.className),
    });
}

function ripple(event)
{
    const targetElmnt    = event.currentTarget;
    const wrapperElmnt   = document.createElement('span');
    const rippleElmnt    = document.createElement('span');
    const rippleSize     = Math.max(targetElmnt.clientWidth, targetElmnt.clientHeight);
    const targetBoundary = targetElmnt.getBoundingClientRect();

    wrapperElmnt.style.width = `${targetElmnt.clientWidth}px`
    wrapperElmnt.style.height = `${targetElmnt.clientHeight}px`
    wrapperElmnt.classList.add('rippleWrapperComponent');

    rippleElmnt.style.width = `${rippleSize}px`;
    rippleElmnt.style.height = `${rippleSize}px`;
    rippleElmnt.style.left = `${Math.round(event.clientX - targetBoundary.left - rippleSize/2)}px`;
    rippleElmnt.style.top = `${Math.round(event.clientY - targetBoundary.top - rippleSize/2)}px`;
    rippleElmnt.classList.add('rippleComponent');

    wrapperElmnt.appendChild(rippleElmnt);
    targetElmnt.appendChild(wrapperElmnt);

    setTimeout(() => {
        wrapperElmnt.remove();
    }, 1000)
}

export default Ripple;
