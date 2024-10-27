import './style.css';
import Folders from '../Folders';
import Items from '../Items';
import React from 'react';
import Ripple from '@/components/Ripple';
import Str from '@/utilities/StringHelper';
import Visibility from '../../Visibility';

const Folder = React.forwardRef((props, ref) => {
    const {
        attributeMaps: AM,
        children,
        className,
        classNames,
        data,
        filter,
        folderObject,
        itemFilter,
        hidden,
        href,
        isActive,
        items,
        itemAttributeMaps,
        onClick,
        reload,
        ...attrs
    } = props;

    const getAttr = (attrName) => {
        const attr = props?.[attrName];

        if(typeof attr === 'function') return attr(folderObject);
        else return attr;
    };

    const isChildActive = items?.some((item) => (
        typeof isActive == 'function' ? isActive?.(item) : Boolean(isActive)
    ));

    return (
        <Visibility hidden={getAttr('hidden')}>
            <li {...attrs}
                ref={ref}
                className={Str.joinClassName(
                    'menu-folder-component',
                    getAttr('className'),
                    getAttr('classNames')?.base
                )}
            >
                <details
                    open={isChildActive}
                    className={Str.joinClassName(
                        getAttr('classNames')?.details,
                        (getAttr('isActive') || isChildActive) && 'active'
                    )}
                >
                    <Ripple>
                        <summary
                            className={getAttr('classNames')?.summary}
                            onClick={(event) => {onClick?.(event, folderObject)}}
                        >
                            {getAttr('children')}
                        </summary>
                    </Ripple>

                    <ul className={getAttr('classNames')?.list}>
                        <Folders
                            {...props}
                            data={filter ? data?.filter(filter) : data}
                            attributeMaps={AM}
                            isActive={isActive}
                            itemAttributeMaps={itemAttributeMaps}
                        />

                        <Items
                            {...props}
                            data={itemFilter ? items?.filter(itemFilter) : items}
                            attributeMaps={itemAttributeMaps}
                            isActive={isActive}
                        />
                    </ul>
                </details>
            </li>
        </Visibility>
    );
});

export default Folder;
