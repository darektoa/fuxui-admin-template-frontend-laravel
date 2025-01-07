import isKeyPair from '../isKeyPair';

type KeyPair = Record<string, any>;

function merge(target: KeyPair = {}, ...sources: any) {
    if (!sources?.length && !isKeyPair(target)) return target;

    const result = { ...target }; // Create new Object Reference

    sources?.forEach((source: any) => {
        if (!isKeyPair(source)) return;

        for (const key in source) {
            if (isKeyPair(source[key])) {
                result[key] = merge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
    });

    return result;
}

export default merge;
