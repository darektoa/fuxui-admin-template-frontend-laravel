import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';
import Visibility from '../Visibility';

function Section(props) {
    const {
        children, className, hidden, ...attrs
    } = props;

    return (
        <Visibility hidden={hidden}>
            <section
                {...attrs}
                className={Str.joinClassName('section-component', className)}
            >
                {children}
            </section>
        </Visibility>
    );
}

export default Section;
