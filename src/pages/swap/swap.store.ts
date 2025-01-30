import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { chain, combine, combineArray, mergeArray, tap } from '@most/core';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { constant, flow, identity, pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import { injectable } from '@injectable-ts/core';
import { newWaletRestService } from '@/API/whalet.service';
import { newSwipeRestService } from '@/API/swipe.service';
import { Asset } from '../whalet/whalet.model';
import {
    formatValueInStableCoin,
    getAssetsEffectMapping,
    mapAssetToSwapAsset,
    SwapAsset,
} from './swap.model';
import { createAdapter } from '@most/adapter';

export interface SwipeStore {
    swapAssets: Property<E.Either<string, Array<SwapAsset>>>;
    allAssets: Property<E.Either<string, Array<Asset>>>;

    emmitSwap: () => void;

    selectAssetBottomSheetIsOpen: Property<boolean>;
    onOpenselectAssetBottomSheetIsOpen: () => void;
    onCloseselectAssetBottomSheetIsOpen: () => void;

    addAssetBottomSheetIsOpen: Property<boolean>;
    onOpenaAddAssetBottomSheetIsOpen: () => void;
    onCloseAddAssetBottomSheetIsOpen: () => void;

    setCurrentVariableAsset: (id: string) => void;
    setAddCurrentVariableAsset: (id: string) => void;
    setCurrentVariableSwapAsset: (id: string) => void;
    onRemoveAsset: (id: string) => void;
    updAssetCurrentValue: (id: string, value: number) => void;

    swapTokenOrder: () => void;
    onReset: () => void;
    onMaxClick: () => void;
}

export type NewSwipeStore = ValueWithEffect<SwipeStore>;

export const newSwipeStore = injectable(
    newWaletRestService,
    newSwipeRestService,
    (walletService, swipeRestService) => (): NewSwipeStore => {
        //#region Atoms
        const allAssets = newLensedAtom<E.Either<string, Array<Asset>>>(
            E.left('pending')
        );
        const waletAssets = newLensedAtom<E.Either<string, Array<Asset>>>(
            E.left('pending')
        );

        const swapAssets = newLensedAtom<E.Either<string, Array<SwapAsset>>>(
            E.left('pending')
        );

        const selectAssetBottomSheetIsOpen = newLensedAtom(false);
        const addAssetBottomSheetIsOpen = newLensedAtom(false);

        const currentVariableSwapAsset = newLensedAtom('');
        const [setCurrentVariableAsset, currentVariableAsset] =
            createAdapter<string>();

        const [setAddCurrentVariableAsset, addCurrentVariableAsset] =
            createAdapter<string>();

        const [onRemoveAsset, removeAssetEvent] = createAdapter<string>();

        const [onReset, onResetEvent] = createAdapter<void>();

        //#region Functions
        const onOpenselectAssetBottomSheetIsOpen = () =>
            selectAssetBottomSheetIsOpen.set(true);

        const onCloseselectAssetBottomSheetIsOpen = () =>
            selectAssetBottomSheetIsOpen.set(false);

        const onOpenaAddAssetBottomSheetIsOpen = () =>
            addAssetBottomSheetIsOpen.set(true);
        const onCloseAddAssetBottomSheetIsOpen = () =>
            addAssetBottomSheetIsOpen.set(false);

        const setCurrentVariableSwapAsset = currentVariableSwapAsset.set;

        const swapTokenOrder = () =>
            pipe(swapAssets.get(), E.map(A.reverse), swapAssets.set);

        const updAssetCurrentValue = (id: string, value: number) => {
            const currentAssetPrice = pipe(
                swapAssets.get(),
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
                swapAssets.get(),
                E.map((assets) => {
                    return pipe(
                        assets,
                        A.map((asset) => {
                            if (asset.id === id) {
                                const newAsset = {
                                    ...asset,
                                    currentValue: value,
                                };
                                return {
                                    ...newAsset,
                                    valueInStableCoin: formatValueInStableCoin(
                                        value * asset.price
                                    ),
                                };
                            } else {
                                return {
                                    ...asset,
                                    currentValue: Number(
                                        (
                                            currentAssetPrice / asset.price
                                        ).toFixed(2)
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
                swapAssets.set
            );
        };

        const emmitSwap = () => {
            const currentSwapAssets = swapAssets.get();

            const amount = pipe(
                currentSwapAssets,
                E.chain(flow(A.head, E.fromOption(constant('error')))),
                E.chain((asset) => E.fromNullable('error')(asset.currentValue)),
                E.fold(() => 0, identity)
            );

            const tokens = pipe(
                currentSwapAssets,
                E.map(flow(A.map((asset) => asset.assetName))),
                E.fold(() => [], identity)
            );
            swipeRestService.initiate({ amount, tokens });
        };

        const onMaxClick = () => {
            const currentSwapAssets = swapAssets.get();

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
                                currentValue: Number(
                                    asset.availablePrice.toFixed(2)
                                ),
                            };
                        } else {
                            return asset;
                        }
                    })
                ),
                swapAssets.set
            );
            firstEl &&
                updAssetCurrentValue(
                    firstEl.id,
                    Number(firstEl.availablePrice.toFixed(2))
                );
        };

        //#region Event
        const testEvent = swipeRestService.getConnection();

        const getAssetsEffect = pipe(
            combine(
                (assets, walletAssets) => ({
                    assets,
                    walletAssets,
                }),
                swipeRestService.getAssets(),
                walletService.getAssets()
            ),
            tap(({ assets, walletAssets: waletAssetsResp }) => {
                allAssets.set(assets);
                waletAssets.set(waletAssetsResp);
                console.log(assets, 'assets');

                getAssetsEffectMapping(
                    assets,
                    waletAssets.get(),
                    swapAssets.set
                );
            })
        );

        const onAssetSelectEvent = pipe(
            currentVariableAsset,
            tap((id) => {
                const currentAllAssets = allAssets.get();
                const currentWaletAssets = waletAssets.get();
                const currentSwapAssets = swapAssets.get();

                const currentWaletAsset = pipe(
                    currentWaletAssets,
                    E.chain(
                        flow(
                            A.findFirst((x) => x.id === id),
                            E.fromOption(constant('error'))
                        )
                    ),
                    E.fold(() => undefined, identity)
                );

                const isIdExistOnSwapAssets = !pipe(
                    currentSwapAssets,
                    E.chain(
                        flow(
                            A.filterMap((asset) =>
                                asset.id === id ? O.some(id) : O.none
                            ),
                            A.head,
                            E.fromOption(constant('error'))
                        )
                    ),
                    E.fold(() => undefined, identity)
                );
                if (isIdExistOnSwapAssets) {
                    selectAssetBottomSheetIsOpen.set(false);

                    pipe(
                        swapAssets.get(),
                        E.map(
                            A.map((asset) => {
                                if (
                                    asset.id === currentVariableSwapAsset.get()
                                ) {
                                    const newAsset = pipe(
                                        currentAllAssets,
                                        E.chain(
                                            flow(
                                                A.findFirst((x) => x.id === id),
                                                E.fromOption(constant('error')),
                                                E.map((asset) => {
                                                    if (currentWaletAsset) {
                                                        return {
                                                            ...asset,
                                                            balance:
                                                                currentWaletAsset.balance,
                                                        };
                                                    }
                                                    return asset;
                                                }),
                                                E.map(mapAssetToSwapAsset)
                                            )
                                        )
                                    );
                                    return newAsset;
                                } else {
                                    return E.right(asset);
                                }
                            })
                        ),
                        E.chain(
                            A.traverse(E.Applicative)((either) =>
                                pipe(
                                    either,
                                    E.mapLeft(() => 'Error in array element')
                                )
                            )
                        ),
                        swapAssets.set
                    );
                }
            })
        );

        const onAssetAddEvent = pipe(
            addCurrentVariableAsset,
            tap((id) => {
                const currentAllAssets = allAssets.get();
                const currentWaletAssets = waletAssets.get();
                const currentSwapAssets = swapAssets.get();

                const currentWaletAsset = pipe(
                    currentWaletAssets,
                    E.chain(
                        flow(
                            A.findFirst((x) => x.id === id),
                            E.fromOption(constant('error'))
                        )
                    ),
                    E.fold(() => undefined, identity)
                );

                const isIdExistOnSwapAssets = !pipe(
                    currentSwapAssets,
                    E.chain(
                        flow(
                            A.filterMap((asset) =>
                                asset.id === id ? O.some(id) : O.none
                            ),
                            A.head,
                            E.fromOption(constant('error'))
                        )
                    ),
                    E.fold(() => undefined, identity)
                );

                const currentSelectedAsset = pipe(
                    currentAllAssets,
                    E.chain(
                        flow(
                            A.filterMap((asset) =>
                                asset.id === id ? O.some(asset) : O.none
                            ),
                            A.head,
                            E.fromOption(constant('error')),
                            E.map(mapAssetToSwapAsset)
                        )
                    ),
                    E.fold(() => undefined, identity)
                );

                if (isIdExistOnSwapAssets) {
                    onCloseAddAssetBottomSheetIsOpen();
                    console.log(currentWaletAsset, 'currentWaletAsset');

                    pipe(
                        currentSwapAssets,
                        E.map((assets) => {
                            if (currentWaletAsset) {
                                return [
                                    ...assets,
                                    mapAssetToSwapAsset(currentWaletAsset),
                                ];
                            } else if (currentSelectedAsset) {
                                return [...assets, currentSelectedAsset];
                            } else {
                                return assets;
                            }
                        }),
                        swapAssets.set
                    );
                }
            })
        );

        const removeAssetEffect = pipe(
            removeAssetEvent,
            tap((id) => {
                const currentSwapAssets = swapAssets.get();
                pipe(
                    currentSwapAssets,
                    E.map(A.filter(({ id: assetId }) => assetId !== id)),
                    swapAssets.set
                );
            })
        );

        // TODO - будет рабоать иначе (переполучать стоимость ассетов и обновлять стоимость)
        const resetEffect = pipe(
            onResetEvent,
            chain(() =>
                combine(
                    (assets, walletAssets) => ({
                        assets,
                        walletAssets,
                    }),
                    swipeRestService.getAssets(),
                    walletService.getAssets()
                )
            ),
            tap(({ assets, walletAssets: waletAssetsResp }) => {
                allAssets.set(assets);
                waletAssets.set(waletAssetsResp);

                getAssetsEffectMapping(
                    assets,
                    waletAssets.get(),
                    swapAssets.set
                );
            })
        );

        return valueWithEffect.new(
            {
                swapAssets,
                emmitSwap,
                selectAssetBottomSheetIsOpen,
                onOpenselectAssetBottomSheetIsOpen,
                onCloseselectAssetBottomSheetIsOpen,
                addAssetBottomSheetIsOpen,
                onOpenaAddAssetBottomSheetIsOpen,
                onCloseAddAssetBottomSheetIsOpen,
                allAssets,
                setCurrentVariableAsset,
                setAddCurrentVariableAsset,
                setCurrentVariableSwapAsset,
                swapTokenOrder,
                updAssetCurrentValue,
                onReset,
                onMaxClick,
                onRemoveAsset,
            },
            testEvent,
            getAssetsEffect,
            onAssetSelectEvent,
            resetEffect,
            onAssetAddEvent,
            removeAssetEffect
        );
    }
);
