function isKeyPair(value?: Array<any> | object) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export default isKeyPair;