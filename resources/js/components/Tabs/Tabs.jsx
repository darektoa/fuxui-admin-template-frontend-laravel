import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function Tabs(props) {
    const {
        children, className, indicatorClassName, ...attrs
    } = props;

    return (
        <div
            {...attrs}
            className={Str.joinClassName('tabs-component', className)}
        >
            {children}
            <div className={Str.joinClassName('tabs-component__indicator', indicatorClassName)} />
        </div>
    );
}

export default Tabs;
