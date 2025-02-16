import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';
import { pipe, flow, constant, identity } from 'fp-ts/lib/function';
import { formatValueInStableCoin } from '../../swap.model';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';

export interface SwarCard {
    onArrowClick: (id: string) => void;
    onChangeField: (id: string, value: number) => void;
    onMaxClick: () => void;
}

export interface NewSwarCard {
    (): ValueWithEffect<SwarCard>;
}

export const newSwarCard = injectable(
    token('store')<SwapStore>(),
    (store): NewSwarCard =>
        () => {
            const onArrowClick = (id: string) => {
                store.setSelectAssetBottomSheetIsOpen(true);
                store.setCurrentVariableSwapAsset(id);
            };

            const onChangeField = (id: string, value: number) => {
                const currentAssetPrice = pipe(
                    store.getSwapAssets(),
                    E.chain(
                        flow(
                            A.findFirst((asset) => asset.id === id),
                            E.fromOption(() => 'error')
                        )
                    ),
                    E.fold(
                        () => 0,
                        (asset) => asset.price * value
                    )
                );

                pipe(
                    store.getSwapAssets(),
                    E.map((assets) => {
                        return pipe(
                            assets,
                            A.mapWithIndex((i, asset) => {
                                if (asset.id === id) {
                                    const newAsset = {
                                        ...asset,
                                        currentValue: value,
                                    };
                                    return {
                                        ...newAsset,
                                        valueInStableCoin:
                                            formatValueInStableCoin(
                                                value * asset.price
                                            ),
                                        hasError:
                                            i === 0
                                                ? newAsset.balanceInWalet <
                                                  value
                                                : false,
                                    };
                                } else {
                                    return {
                                        ...asset,
                                        currentValue: Number(
                                            currentAssetPrice / asset.price
                                        ),
                                        valueInStableCoin:
                                            formatValueInStableCoin(
                                                currentAssetPrice
                                            ),
                                    };
                                }
                            })
                        );
                    }),
                    store.setSwapAssets
                );
            };

            const onMaxClick = () => {
                const currentSwapAssets = store.getSwapAssets();

                const firstEl = pipe(
                    currentSwapAssets,
                    E.chain(flow(A.head, E.fromOption(constant('error')))),
                    E.fold(constant(undefined), identity)
                );

                pipe(
                    currentSwapAssets,
                    E.map(
                        A.mapWithIndex((i, asset) => {
                            if (i === 0) {
                                return {
                                    ...asset,
                                    currentValue: Number(asset.balanceInWalet),
                                };
                            } else {
                                return asset;
                            }
                        })
                    ),
                    store.setSwapAssets
                );
                firstEl &&
                    onChangeField(firstEl.id, Number(firstEl.balanceInWalet));
            };

            return valueWithEffect.new({
                onArrowClick,
                onChangeField,
                onMaxClick,
            });
        }
);
