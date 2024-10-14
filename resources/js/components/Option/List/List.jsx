import './style.css';
import { cloneElement } from 'react';
import { className as classname } from '../@/utilities/string-helper';

function List(props) {
    const {
        children, className, getValue, ...attrs
    } = props;

    return (
        <div
            {...attrs}
            className={classname('option-list-component', className)}
        >
            {children}
        </div>
    );
}

export default List;
