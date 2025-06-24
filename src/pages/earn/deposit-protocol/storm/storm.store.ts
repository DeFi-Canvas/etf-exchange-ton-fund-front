import {
    useValueWithEffect,
    ValueWithEffect,
    valueWithEffect,
} from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { injectable, token } from '@injectable-ts/core';

interface StormStore {
    temp: Property<number>;
}

// export interface NewStormStore {
//     (): ValueWithEffect<StormStore>;
// }
export type NewStormStore = ValueWithEffect<StormStore>;

export const newStormStore = (): NewStormStore => {
    const temp = newLensedAtom(1);
    return valueWithEffect.new({ temp });
};

// export const StormStore = injectable('STORM_STORE', () =>
//     useValueWithEffect(() => stormStore(), [])
// );

export const StormStore = token('stormStore')<NewStormStore>();
