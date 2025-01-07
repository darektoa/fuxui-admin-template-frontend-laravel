import { Spread } from '@/global';
import { KeyPair } from '../isKeyPair/types';

export type SoftMergeFunc = <TTarget extends KeyPair, TSources extends KeyPair[]>(
    target: TTarget,
    ...sources: TSources
) => TTarget & Spread<TSources> ;
