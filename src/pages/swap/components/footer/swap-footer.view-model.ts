import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { constant, flow, identity, pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { tap } from '@most/core';
import * as O from 'fp-ts/Option';
import { swapBtnErrorMap } from '../../swap.model';

export interface SwapFooter {
    isDisabled: Property<boolean>;
    btnText: Property<string>;
    onClick: () => void;
}

export interface NewSwapFooter {
    (): ValueWithEffect<SwapFooter>;
}

export const newSwapFooter = injectable(
    token('store')<SwapStore>(),
    (store): NewSwapFooter =>
        () => {
            const isDisabled = newLensedAtom(true);
            const btnText = newLensedAtom('');

            const errorEffect = pipe(
                store.swapBtnError,
                fromProperty,
                tap((err) => {
                    isDisabled.set(O.isSome(err));
                }),
                tap(
                    flow(
                        O.map(swapBtnErrorMap),
                        O.fold(constant('Swap'), identity),
                        btnText.set
                    )
                )
            );

            return valueWithEffect.new(
                {
                    isDisabled: isDisabled,
                    btnText,
                    onClick: store.emmitSwap,
                },
                errorEffect
            );
        }
);
