import './style.css';
import Folder from '../Folder';
import Item from '../Item';
import React from 'react';
import Str from '@/utilities/StringHelper';

function checkTime(hours1, minutes1, seconds1) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const targetHours = hours1;
    const targetMinutes = minutes1;
    const targetSeconds = seconds1;

    if (hours === targetHours && minutes === targetMinutes && seconds === targetSeconds) {
        return true;
    } else {
        return false;
    }
}


const Folders = (props) => {
    const {
        attributeMaps: AM,
        data,
        filter,
        isActive,
        itemAttributeMaps: IAM,
        itemFilter,
        ...attrs
    } = props;

    const attrMaps = (maps) => ({
        children: maps?.children ?? 'children',
        className: maps?.className ?? 'className',
        classNames: maps?.classNames ?? 'classNames',
        data: maps?.data ?? 'data',
        filter: maps?.filter ?? 'filter',
        hidden: maps?.hidden ?? 'hidden',
        href: maps?.href ?? 'href',
        isActive: maps?.isActive ?? 'isActive',
        items: maps?.items ?? 'items',
        reload: maps?.reload ?? 'reload',
    });

    const getAttr = (attrName, item, maps=AM) => {
        const propsAttr = props?.[attrName];

        if(typeof propsAttr === 'function') return propsAttr;
        else return item?.[attrMaps(maps)[attrName]] ?? propsAttr;
    };

    return (
        <>
            {data?.map((item, index) => {
                if(typeof itemFilter === 'function' && itemFilter(item)) return (
                    <Item
                        {...attrs}
                        key={`menu-folder-${index}`}
                        itemObject={item}
                        className={getAttr('className', item, IAM)}
                        classNames={getAttr('classNames', item, IAM)}
                        hidden={getAttr('hidden', item, IAM)}
                        href={getAttr('href', item, IAM)}
                        isActive={() => typeof isActive === 'function' ? isActive(item) : isActive}
                        reload={getAttr('reload', item, IAM)}
                    >
                        {getAttr('children', item, IAM)}
                    </Item>
                );


                return (
                    <Folder
                        {...attrs}
                        key={`menu-folder-${index}`}
                        folderObject={item}
                        attributeMaps={AM}
                        className={getAttr('className', item)}
                        classNames={getAttr('classNames', item)}
                        data={getAttr('data', item)}
                        filter={filter}
                        hidden={getAttr('hidden', item)}
                        href={getAttr('href', item)}
                        isActive={getAttr('isActive', item)}
                        itemAttributeMaps={IAM}
                        itemFilter={itemFilter}
                        items={getAttr('items', item)}
                        reload={getAttr('reload', item)}
                    >
                        {getAttr('children', item)}
                    </Folder>
                );
            })}
        </>
    );
}

export default Folders;
