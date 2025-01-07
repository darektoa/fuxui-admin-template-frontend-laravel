const join = (
    separator: string | null | undefined,
    ...values: Array<string | number | undefined>
) => {
    if (!values?.length) return '';

    return values
        .reduce((tempResult, value) =>
            !value ? tempResult : `${tempResult}${separator}${value}`,
        )
        ?.toString() || '';
};

export default join;
