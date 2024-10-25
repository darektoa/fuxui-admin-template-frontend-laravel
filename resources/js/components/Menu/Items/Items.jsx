import './style.css';
import Folder from '../Folder';
import Item from '../Item';
import React from 'react';
import Ripple from '../../Ripple';
import Str from '@/utilities/StringHelper';
import Visibility from '../../Visibility';

const Items = React.forwardRef((props, ref) => {
    const {
        children,
        className,
        classNames,
        hidden,
        href,
        isActive,
        items,
        itemAttributeMaps,
        groups,
        groupAttributeMaps,
        ...attrs
    } = props;

    if(Array.isArray(groups) && groups?.length)
        return <Folder {...props} />;

    return (
        <Visibility hidden={hidden}>
            
        </Visibility>
    );
});

export default Items;
