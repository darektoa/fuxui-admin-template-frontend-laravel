const join = (separator, ...values) => {
    if (!values.length) return '';
    return values.reduce((tempResult, value) => (!value ? tempResult : `${tempResult}${separator}${value}`));
};

export default join;
