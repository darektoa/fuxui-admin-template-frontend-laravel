import './style.css';
import { Link } from 'react-router-dom';
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
        itemObject,
        onClick,
        reload,
        ...attrs
    } = props;

    const getAttr = (attrName) => {
        const attr = props?.[attrName];

        if(typeof attr === 'function') return attr(itemObject);
        else return attr;
    };

    return (
        <Visibility hidden={getAttr('hidden')}>
            <Ripple>
                <li
                    ref={ref}
                    onClick={(event) => onClick?.(event, itemObject)}
                    className={Str.joinClassName(
                        'menu-item-component',
                        getAttr('className'),
                        getAttr('classNames')?.base
                    )}
                >
                    <Link reloadDocument={getAttr('reload')} to={getAttr('href')}
                        className={Str.joinClassName(
                            getAttr('classNames')?.link,
                            getAttr('isActive') && 'active'
                        )}
                    >
                        { getAttr('children') }
                    </Link>
                </li>
            </Ripple>
        </Visibility>
    );
});

export default Item;
