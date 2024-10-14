import './style.css';
import { useState } from 'react';
import { className as classname } from '@/utilities/string-helper';
import Icon from '../Icon';
import Option from '../Option';

function Select(props) {
    const {
        children, onBlur, onFocus, placeholder, ...attrs
    } = props;
    const [showOptions, setShowOptions] = useState(false);

    const selectFocusHandle = () => {
        setTimeout(() => setShowOptions(true), 100);
        if (onFocus) onFocus();
    };

    const selectBlurHandle = () => {
        setShowOptions(false);
        if (onBlur) onBlur();
    };

    const selectCoverClickHandle = () => {
        console.log('click');
        setShowOptions(!showOptions);
    };

    return (
        <div className="select-component">
            <div
                {...attrs}
                className="select-component__select"
                onBlur={selectBlurHandle}
                onFocus={selectFocusHandle}
                role="combobox"
                tabIndex="0"
                aria-haspopup="menu"
            >
                <div
                    className={classname('select-component__select__cover', 'select-component__select__cover--active')}
                    onClick={selectCoverClickHandle}
                />
                <div className="select-component__select__content">{placeholder || children[0]}</div>
                <Icon
                    name="chevron-down"
                    className={classname('w-6 shrink-0', showOptions && 'rotate-180')}
                />
                <Option.List className={showOptions ? null : 'hidden'}>{children}</Option.List>
            </div>

            <select className="hidden">{children}</select>
        </div>
    );
}

export default Select;
