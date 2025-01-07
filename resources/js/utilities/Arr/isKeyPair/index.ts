function isKeyPair(value?: unknown) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export default isKeyPair;
