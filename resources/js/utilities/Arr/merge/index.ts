import { MergeFunc } from './types';
import isKeyPair from '../isKeyPair';

const merge: MergeFunc = (target, ...sources) => {
    if (!sources?.length && !isKeyPair(target)) return target;

    const result: any = { ...(target as object) }; // Create new Object Reference

    sources?.forEach((source) => {
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
};

export default merge;
