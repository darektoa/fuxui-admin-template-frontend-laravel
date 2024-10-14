import { useState } from 'react';

function useForm(initialValues = {}) {
    const [values, setValues] = useState(
        initialValues,
    );

    const [methods, setMethods] = useState({
        onChanged: null,
        onSubmitted: null,
    });

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target?.files?.[0] ?? event.target.value;

        setValues((states) => ({
            ...states,
            [key]: value,
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
        values,
    };
}

export default useForm;
