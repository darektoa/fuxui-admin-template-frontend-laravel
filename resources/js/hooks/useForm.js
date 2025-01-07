import { useState } from 'react';

function useForm(initialValues = {}) {
    const [values, setValues] = useState(
        initialValues,
    );

    const [methods, setMethods] = useState({
        onChanged: null,
        onSubmitted: null,
    });

    function appendWhenArray(value, oldValue, limit=null) {
        if(! Array.isArray(oldValue)) return value;

        const newVal = [value, ...oldValue];

        if(limit) return newVal.slice(0, limit);
        else return newVal;
    };

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target?.files?.[0] ?? event.target.value;

        setValues((states) => ({
            ...states,
            [key]: appendWhenArray(value, states[key]),
        }));

        methods?.onChanged?.(event);
    }

    function handleSubmit(event) {
        methods?.onSubmitted?.(event);
    }

    function onSubmitted(functionOnSubmitted) {
        setMethods((states) => ({
            ...states,
            onSubmitted: functionOnSubmitted,
        }));
    }

    function onChanged(functionOnChanged) {
        setMethods((states) => ({
            ...states,
            onChange: functionOnChanged,
        }));
    }

    return {
        handleChange,
        handleSubmit,
        initialValues,
        onChanged,
        onSubmitted,
        setValues,
        values,
    };
}

export default useForm;
