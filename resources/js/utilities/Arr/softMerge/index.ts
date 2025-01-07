import { SoftMergeFunc } from './types';
import isKeyPair from '../isKeyPair';

const softMerge: SoftMergeFunc = (target: any, ...sources) => {
    if (!sources?.length && !isKeyPair(target)) return target;

    sources?.forEach((source: any) => {
        if (!isKeyPair(source)) return;

        for (const key in source) {
            if (isKeyPair(source[key])) {
                target[key] = softMerge(target[key] || {}, source[key]);
            } else {
                target[key] = source[key];
            }
        }
    });

    return target;
};

export default softMerge;
