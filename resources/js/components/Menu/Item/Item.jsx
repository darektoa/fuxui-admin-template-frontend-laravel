import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';
import Visibility from '../../Visibility';
import Ripple from '../../Ripple';

const Item = React.forwardRef((props, ref) => {
    const {
        children,
        className,
        classNames,
        hidden,
        href,
        isActive,
        items,
        itemAttributeMaps,
        ...attrs
    } = props;

    return (
        <Visibility hidden={hidden}>
            <Ripple>
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
            </Ripple>
        </Visibility>
    );
});

export default Item;
