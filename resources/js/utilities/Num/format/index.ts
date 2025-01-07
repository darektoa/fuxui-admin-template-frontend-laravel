import { FormatFunc } from './types';

const format: FormatFunc = (value, options) => {
    if (typeof value !== 'number') return '';

    const formated = value?.toLocaleString(options?.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formated;
};

export default format;
