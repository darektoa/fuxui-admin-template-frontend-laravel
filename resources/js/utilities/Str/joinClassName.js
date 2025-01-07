import join from './join';

function joinClassName(...values) {
    const filtered = values.filter((item) => item);
    return join(' ', ...filtered);
}

export default joinClassName;
