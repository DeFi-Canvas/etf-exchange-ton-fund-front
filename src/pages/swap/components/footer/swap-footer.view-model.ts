import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { constant, flow, identity, pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { chain, map, tap } from '@most/core';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { SwapBtnError, swapBtnErrorMap } from '../../swap.model';
import { newSwapRestService } from '@/API/swipe.service';
import { createAdapter } from '@most/adapter';

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
    newSwapRestService,
    (store, swapRestService): NewSwapFooter =>
        () => {
            const isDisabled = newLensedAtom(true);
            const btnText = newLensedAtom('');

            const [emmitSwap, emmitSwapEvent] = createAdapter<void>();

            const swapBtnErrorEffect = pipe(
                store.swapAssets,
                fromProperty,
                tap((swapAssets) => {
                    pipe(
                        swapAssets,
                        E.chain(flow(A.head, E.fromOption(constant('error')))),
                        E.chain((asset) => {
                            if (asset.balanceInWalet < asset.currentValue) {
                                return E.right('INSUFFICIENT_BALANCE');
                            }
                            if (asset.currentValue === 0) {
                                return E.right('EMPTY_FIELD');
                            }
                            return E.left('');
                        }),
                        E.fold(
                            () => {
                                store.setSwapBtnError(O.none);
                            },
                            (err) =>
                                store.setSwapBtnError(
                                    O.some(err as SwapBtnError)
                                )
                        )
                    );
                })
            );
            const emmitSwapEffect = pipe(
                emmitSwapEvent,
                map(() => {
                    const currentSwapAssets = store.getSwapAssets();

                    const amount = pipe(
                        currentSwapAssets,
                        E.chain(flow(A.head, E.fromOption(constant('error')))),
                        E.chain((asset) =>
                            E.fromNullable('error')(asset.currentValue)
                        ),
                        E.fold(() => 0, identity)
                    );

                    const tokens = pipe(
                        currentSwapAssets,
                        E.map(flow(A.map((asset) => asset.assetName))),
                        E.fold(() => [], identity)
                    );
                    store.setResultStatus('PROGRESS');
                    store.setResultBottomSheetIsOpen(true);
                    return { amount, tokens };
                }),
                chain(swapRestService.initiate),
                tap((data) => {
                    store.setResultStatus(
                        E.isRight(data) ? 'SUCCESS' : 'ERROR'
                    );
                })
            );

            const errorEffect = pipe(
                store.swapBtnError,
                fromProperty,
                tap(flow(O.isSome, isDisabled.set)),
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
                    onClick: emmitSwap,
                },
                swapBtnErrorEffect,
                errorEffect,
                emmitSwapEffect
            );
        }
);
