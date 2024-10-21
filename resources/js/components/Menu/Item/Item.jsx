import './style.css';
import Folder from '../Folder';
import React from 'react';
import Str from '@/utilities/StringHelper';
import Visibility from '../../Visibility';

const Item = React.forwardRef((props, ref) => {
    const {
        children,
        className,
        classNames,
        hidden,
        href,
        isActive,
        items,
        ...attrs
    } = props;

    if(Array.isArray(items))
        return <Folder {...props} />;

    return (
        <Visibility hidden={hidden}>
            <li {...attrs}
                ref={ref}
                className={Str.joinClassName('menu-item-component', className, classNames?.base)}
            >
                <a href={href}
                    className={Str.joinClassName(classNames?.link, isActive && 'active')}
                >
                    { children }
                </a>
            </li>
        </Visibility>
    );
});

export default Item;
