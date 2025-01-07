import join from '../join';

const joinWithSpace = (...values: Array<string | number | undefined>) => {
    const filtered = values.filter((item) => item);
    return join(' ', ...filtered);
};

export default joinWithSpace;
