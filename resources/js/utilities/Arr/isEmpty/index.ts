import isNull from '../isNull';

const isEmpty = (value?: Array<any>) => {
    if (isNull(value)) return true;
    return Boolean(value?.length === 0);
};

export default isEmpty;
