import './style.css';
import { className as classname } from '@/utilities/string-helper';
import Icon from '../Icon';

function Option(props) {
    const {
        children, className, selected, ...attrs
    } = props;

    return (
        <div
            {...attrs}
            role="menuitem"
            className={classname('option-component', className)}
        >
            <div className="option-component__content">{children}</div>
            <Icon
                name="check"
                className={classname(
                    'option-component__selected-icon',
                    selected ? 'option-component__selected-icon--selected' : null,
                )}
            />
        </div>
    );
}

export default Option;
