import join from './join';

const joinClassName = (...values) => join(' ', ...values.filter(item => item));

export default joinClassName;
