import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

const Card = React.forwardRef((props, ref) => {
    const {
        children, className, disabled, ...attrs
    } = props;

    return (
        <div
            {...attrs}
            ref={ref}
            className={Str.joinClassName('card-component', className, disabled && 'card-component--disabled')}
        >
            {children}
        </div>
    );
});

export default Card;
