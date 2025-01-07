import isEmpty from '../isEmpty';

const isNotEmpty = (value?: Array<any>) => {
    return !isEmpty(value);
};

export default isNotEmpty;
