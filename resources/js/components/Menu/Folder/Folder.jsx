import './style.css';
import Item from '../Item';
import React from 'react';
import Str from '@/utilities/StringHelper';
import Ripple from '@/components/Ripple';

const Folder = React.forwardRef((props, ref) => {
    const {
        itemAttributeMaps,
        children,
        className,
        classNames,
        isActive,
        items,
        ...attrs
    } = props;

    const {
        children: childrenKey = 'children',
        className: classNameKey = 'className',
        classNames: classNamesKey = 'classNames',
        isActive: isActiveKey = 'isActive',
        items: itemsKey = 'items',
        itemAttributeMaps: itemAttributeMapsKey = 'itemAttributeMaps',
        href: hrefKey = 'href',
    } = itemAttributeMaps ?? {};

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
                <Ripple>
                    <summary className={classNames?.summary}>
                        {children}
                    </summary>
                </Ripple>

                <ul className={classNames?.list}>
                    {items?.map((item, index) => (
                        <Item
                            {...item}
                            key={`menu-folder-${index}`}
                            className={item?.[classNameKey]}
                            classNames={item?.[classNamesKey]}
                            href={item?.[hrefKey]}
                            isActive={item?.[isActiveKey]}
                            items={item?.[itemsKey]}
                            itemAttributeMaps={item?.[itemAttributeMapsKey] ?? itemAttributeMaps}
                        >
                            {item?.[childrenKey]}
                        </Item>
                    ))}
                </ul>
            </details>
        </li>
    );
});

export default Folder;
