import './style.css';
import Item from '../Item';
import React from 'react';
import Str from '@/utilities/StringHelper';

const Folder = React.forwardRef((props, ref) => {
    const {
        children,
        className,
        classNames,
        isActive,
        items,
        ...attrs
    } = props;

    const isChildActive = items.some(item => item.isActive);

    return (
        <li {...attrs}
            ref={ref}
            className={Str.joinClassName('menu-folder-component', className, classNames?.base)}
        >
            <details
                className={Str.joinClassName(classNames?.details, (isActive || isChildActive) && 'active')}
                open={isChildActive}
            >
                <summary className={classNames?.summary}>
                    {children}
                </summary>

                <ul className={classNames?.list}>
                    {items?.map((item, index) => (
                        <Item
                            {...item}
                            key={`menu-folder-${index}`}
                            className={item?.className}
                            classNames={item?.classNames}
                            href={item?.href}
                            isActive={item?.isActive}
                        >
                            {children}
                        </Item>
                    ))}
                </ul>
            </details>
        </li>
    );
});

export default Folder;
