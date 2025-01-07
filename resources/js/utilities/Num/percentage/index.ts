import { PercentageFunc } from './types';

const percentage: PercentageFunc = (value, locale = 'en-US') => {
    if (typeof value !== 'number') return '';

    const formated = (Math.floor(value * 100) / 100).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return `${formated}%`;
};

export default percentage;
