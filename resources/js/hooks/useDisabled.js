import { useState } from 'react';

const useDisabled = (properties) => {
    const props = {
        disabledClassName: 'disabled',
        initialValue: false,
        prefix: '',
        ...properties,
    };

    const [result, setResult] = useState({
        ...props,
        className: props.initialValue ? `${props.prefix}-${props.disabledClassName}` : '',
    });

    const handleSetResult = (value) => {
        setResult((result) => ({
            ...result,
            className: value ? result.className : '',
        }));
    };

    return [result, handleSetResult];
};

export default useDisabled;
