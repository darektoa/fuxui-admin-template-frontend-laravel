import { Spread } from '@/global';
import { KeyPair } from '../isKeyPair/types';

export type MergeFunc = <TTarget extends any, TSources extends any[]>(
    target: TTarget,
    ...sources: TSources
) => TTarget & Spread<TSources>;
