import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { chain, combine, tap } from '@most/core';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as t from 'io-ts';
import {
    constant,
    constUndefined,
    flow,
    identity,
    pipe,
} from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import { injectable } from '@injectable-ts/core';
import { newWaletRestService } from '@/API/whalet.service';
import { newSwapRestService } from '@/API/swipe.service';
import { Asset } from '../whalet/whalet.model';
import {
    FiltrebleSwapAsset,
    formatValueInStableCoin,
    getAssetsEffectMapping,
    mapAssetToFiltrebleSwapAsset,
    mapAssetToSwapAsset,
    SWAP_LIST_INFO_INIT,
    SwapAsset,
    SwapBtnError,
    SwapResultStatus,
} from './swap.model';
import { createAdapter } from '@most/adapter';
import { DropdownOptions } from '@/components/dropdown/dropdown.component';
import { fromProperty } from '@/utils/property.utils';

export interface SwapStore {
    swapAssets: Property<E.Either<string, Array<SwapAsset>>>;
    allAssets: Property<E.Either<string, Array<FiltrebleSwapAsset>>>;

    emmitSwap: () => void;

    selectAssetBottomSheetIsOpen: Property<boolean>;
    onOpenselectAssetBottomSheetIsOpen: () => void;
    onCloseselectAssetBottomSheetIsOpen: () => void;

    addAssetBottomSheetIsOpen: Property<boolean>;
    onOpenaAddAssetBottomSheetIsOpen: () => void;
    onCloseAddAssetBottomSheetIsOpen: () => void;

    resultBottomSheetIsOpen: Property<boolean>;
    closeResultBottomSheet: () => void;
    resultStatus: Property<SwapResultStatus>;

    swapListInfo: Property<DropdownOptions[]>;

    setCurrentVariableAsset: (id: string) => void;
    setAddCurrentVariableAsset: (id: string) => void;
    setCurrentVariableSwapAsset: (id: string) => void;
    onRemoveAsset: (id: string) => void;
    onSearchAssets: (ticker: string) => void;
    updAssetCurrentValue: (id: string, value: number) => void;

    swapTokenOrder: () => void;
    onReset: () => void;
    onMaxClick: () => void;

    swapBtnError: Property<O.Option<SwapBtnError>>;
}

export type NewSwapStore = ValueWithEffect<SwapStore>;

export const newSwapStore = injectable(
    newWaletRestService,
    newSwapRestService,
    (walletService, swapRestService) => (): NewSwapStore => {
        //#region Atoms
        const allAssets = newLensedAtom<
            E.Either<string, Array<FiltrebleSwapAsset>>
        >(E.left('pending'));
        const waletAssets = newLensedAtom<E.Either<string, Array<Asset>>>(
            E.left('pending')
        );

        const swapAssets = newLensedAtom<E.Either<string, Array<SwapAsset>>>(
            E.left('pending')
        );

        const swapListInfo =
            newLensedAtom<DropdownOptions[]>(SWAP_LIST_INFO_INIT);

        const selectAssetBottomSheetIsOpen = newLensedAtom(false);
        const addAssetBottomSheetIsOpen = newLensedAtom(false);

        const resultBottomSheetIsOpen = newLensedAtom(false);
        const resultStatus = newLensedAtom<SwapResultStatus>('PROGRESS');

        const currentVariableSwapAsset = newLensedAtom('');
        const [setCurrentVariableAsset, currentVariableAsset] =
            createAdapter<string>();

        const [setAddCurrentVariableAsset, addCurrentVariableAsset] =
            createAdapter<string>();

        const [onRemoveAsset, removeAssetEvent] = createAdapter<string>();
        const [onSearchAssets, onSearchAssetsEvent] = createAdapter<string>();

        const [onReset, onResetEvent] = createAdapter<void>();

        const swapBtnError = newLensedAtom<O.Option<SwapBtnError>>(
            O.some('EMPTY_FIELD')
        );

        //#region Functions
        const closeResultBottomSheet = () => resultBottomSheetIsOpen.set(false);

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
                        A.mapWithIndex((i, asset) => {
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
                                    hasError:
                                        i === 0
                                            ? newAsset.balanceInWalet < value
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

            swapRestService.initiate({ amount, tokens });
            resultBottomSheetIsOpen.set(true);
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
                                currentValue: Number(asset.balanceInWalet),
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
                    Number(firstEl.balanceInWalet)
                );
        };

        //#region Event
        const EVSEvent = pipe(
            swapRestService.getConnection().evs,
            tap((x) => {
                if (x) {
                    resultStatus.set('SUCCESS');
                }
            })
        );

        const getAssetsEffect = pipe(
            combine(
                (assets, walletAssets) => ({
                    assets,
                    walletAssets,
                }),
                swapRestService.getAssets(),
                walletService.getAssets()
            ),
            tap(({ assets, walletAssets: waletAssetsResp }) => {
                pipe(
                    assets,
                    E.map(A.map(mapAssetToFiltrebleSwapAsset)),
                    allAssets.set
                );
                waletAssets.set(waletAssetsResp);

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

                const currentHeadSwapAsset = pipe(
                    currentSwapAssets,
                    E.chain(flow(A.head, E.fromOption(constant('error')))),
                    E.fold(constUndefined, identity)
                );

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
                                                E.map(mapAssetToSwapAsset),
                                                E.map((asset) => {
                                                    if (currentHeadSwapAsset) {
                                                        return {
                                                            ...asset,
                                                            currentValue:
                                                                Number(
                                                                    (currentHeadSwapAsset.currentValue *
                                                                        currentHeadSwapAsset.price) /
                                                                        asset.price
                                                                ),
                                                            valueInStableCoin:
                                                                currentHeadSwapAsset.valueInStableCoin,
                                                        };
                                                    } else return asset;
                                                })
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

        const swapListInfoChangeEffect = pipe(
            swapAssets,
            fromProperty,
            tap((assets) => {
                const currentWaletAsset = waletAssets.get();

                const exchangeRate = pipe(
                    assets,
                    E.map((assets) => ({
                        head: pipe(assets, A.head),
                        tail: pipe(assets, A.tail),
                    })),
                    E.chain(({ head, tail }) => {
                        const headAsset = pipe(
                            head,
                            O.getOrElseW(constUndefined)
                        );

                        return pipe(
                            tail,
                            O.map(
                                A.map((tail) => {
                                    if (headAsset) {
                                        return `1 ${headAsset.assetName} ≈ ${(headAsset.price / tail.price).toFixed(3)} ${tail.assetName}`;
                                    }
                                    return '';
                                })
                            ),
                            E.fromOption(constant('error'))
                        );
                    }),
                    E.getOrElseW(() => [])
                );

                const minimumReceived = pipe(
                    assets,
                    E.map((assets) => ({
                        head: pipe(assets, A.head),
                        last: pipe(assets, A.last),
                    })),
                    E.chain(({ head, last }) => {
                        const headAsset = pipe(
                            head,
                            O.getOrElseW(constUndefined)
                        );

                        return pipe(
                            last,
                            O.map((last) => {
                                if (headAsset) {
                                    const received =
                                        (headAsset.currentValue *
                                            headAsset.price) /
                                        last.price;
                                    return [
                                        `${Number.isNaN(received) ? 0 : received} ${last.assetName}`,
                                    ];
                                }
                                return [''];
                            }),
                            E.fromOption(constant('error'))
                        );
                    }),
                    E.getOrElseW(() => [])
                );

                const baseAssetAfterSwap = pipe(
                    assets,
                    E.chain(flow(A.head, E.fromOption(constant('error')))),
                    E.chain((asset) =>
                        pipe(
                            currentWaletAsset,
                            E.chain(
                                flow(
                                    A.findFirst(
                                        (waletAsset) =>
                                            waletAsset.id === asset.id
                                    ),
                                    E.fromOption(constant('error')),
                                    E.map((waletAsset) => ({
                                        ticker: asset.assetName,
                                        balance: `${
                                            waletAsset.balance -
                                            (asset.currentValue ?? 0)
                                        }`,
                                    }))
                                )
                            )
                        )
                    ),
                    E.fold(
                        () => null,
                        (data) => ({
                            name: `${data.ticker} balance after swap`,
                            value: [data.balance],
                        })
                    )
                );

                const lastAssetAfterSwap = pipe(
                    assets,
                    E.chain(flow(A.last, E.fromOption(constant('error')))),
                    E.chain((asset) =>
                        pipe(
                            currentWaletAsset,
                            E.chainW(
                                flow(
                                    A.findFirst(
                                        (waletAsset) =>
                                            waletAsset.id === asset.id
                                    ),
                                    E.fromOption(constant('error')),
                                    E.map((waletAsset) => ({
                                        ticker: asset.assetName,
                                        balance: `${
                                            waletAsset.balance +
                                            (asset.currentValue ?? 0)
                                        }`,
                                    })),
                                    E.mapLeft(() => ({
                                        ticker: asset.assetName,
                                        balance: `${asset.currentValue ?? 0}`,
                                    }))
                                )
                            )
                        )
                    ),
                    E.fold(
                        (data) =>
                            t.string.is(data)
                                ? null
                                : {
                                      name: `${data.ticker} balance after swap`,
                                      value: [data.balance],
                                  },
                        (data) => ({
                            name: `${data.ticker} balance after swap`,
                            value: [data.balance],
                        })
                    )
                );

                const newSwapListInfo: DropdownOptions[] = [
                    {
                        name: 'Exchange rate',
                        value: exchangeRate,
                    },
                    { name: 'Minimum received', value: minimumReceived },
                    baseAssetAfterSwap,
                    lastAssetAfterSwap,
                ].filter((x) => x !== null);

                swapListInfo.set(newSwapListInfo);
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
                    swapRestService.getAssets(),
                    walletService.getAssets()
                )
            ),
            tap(({ assets, walletAssets: waletAssetsResp }) => {
                pipe(
                    assets,
                    E.map(A.map(mapAssetToFiltrebleSwapAsset)),
                    allAssets.set
                );
                waletAssets.set(waletAssetsResp);

                getAssetsEffectMapping(
                    assets,
                    waletAssets.get(),
                    swapAssets.set
                );
            })
        );

        const onSearchAssetsEffetc = pipe(
            onSearchAssetsEvent,
            tap((tickerName) => {
                pipe(
                    allAssets.get(),
                    E.map(
                        A.map((asset) => {
                            if (
                                !asset.ticker
                                    .toLowerCase()
                                    .includes(tickerName.toLowerCase())
                            ) {
                                return { ...asset, isVisible: false };
                            } else {
                                return { ...asset, isVisible: true };
                            }
                        })
                    ),
                    allAssets.set
                );
            })
        );

        const swapBtnErrorEffect = pipe(
            swapAssets,
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
                        (_) => {
                            swapBtnError.set(O.none);
                        },
                        (err) => swapBtnError.set(O.some(err as SwapBtnError))
                    )
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
                swapListInfo,
                setCurrentVariableAsset,
                setAddCurrentVariableAsset,
                setCurrentVariableSwapAsset,
                swapTokenOrder,
                updAssetCurrentValue,
                onReset,
                onMaxClick,
                onRemoveAsset,
                onSearchAssets,
                resultBottomSheetIsOpen,
                resultStatus,
                closeResultBottomSheet,
                swapBtnError,
            },
            EVSEvent,
            getAssetsEffect,
            onAssetSelectEvent,
            resetEffect,
            onAssetAddEvent,
            removeAssetEffect,
            swapListInfoChangeEffect,
            onSearchAssetsEffetc,
            swapBtnErrorEffect
        );
    }
);
