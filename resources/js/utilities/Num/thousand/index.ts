import { ThousandFunc } from './types';

const thousand: ThousandFunc = (value, locale = 'en-US') => {
    if (typeof value !== 'number') return '';

    const formated = value?.toLocaleString(locale, {
        maximumFractionDigits: 2,
    });

    return formated;
};

export default thousand;
