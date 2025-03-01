import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { combine, tap } from '@most/core';
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
    getAssetsEffectMapping,
    mapAssetToFiltrebleSwapAsset,
    mapAssetToSwapAsset,
    SHODOW_SWAP,
    SWAP_LIST_INFO_INIT,
    SwapAsset,
    SwapBtnError,
    SwapResultStatus,
} from './swap.model';
import { createAdapter } from '@most/adapter';
import { DropdownOptions } from '@/components/dropdown/dropdown.component';
import { fromProperty, newAtomState } from '@/utils/property.utils';
import {
    getCurrentWaletAsset,
    getIsIdExistOnSwapAssets,
} from './swap.store.utils';
import { ResultOptions } from './components/swap-result/swap-result.component';

export interface SwapStore {
    //#region state
    swapAssets: Property<E.Either<string, Array<SwapAsset>>>;
    allAssets: Property<E.Either<string, Array<FiltrebleSwapAsset>>>;
    selectAssetBottomSheetIsOpen: Property<boolean>;
    addAssetBottomSheetIsOpen: Property<boolean>;
    resultBottomSheetIsOpen: Property<boolean>;
    resultStatus: Property<SwapResultStatus>;
    swapListInfo: Property<DropdownOptions[]>;
    resultSwapListInfo: Property<ResultOptions[]>;
    swapBtnError: Property<O.Option<SwapBtnError>>;

    //#region mutations
    onOpenaAddAssetBottomSheetIsOpen: () => void;
    onCloseAddAssetBottomSheetIsOpen: () => void;
    closeResultBottomSheet: () => void;
    onRemoveAsset: (id: string) => void;
    onSearchAssets: (ticker: string) => void;
    swapTokenOrder: () => void;

    //#region get
    getWaletAssets: () => E.Either<string, Array<Asset>>;
    getSwapAssets: () => E.Either<string, SwapAsset[]>;

    //#region set
    setSwapAssets: (assets: E.Either<string, Array<SwapAsset>>) => void;
    setAllAssets: (assets: E.Either<string, Array<FiltrebleSwapAsset>>) => void;
    setWaletAssets: (asset: E.Either<string, Array<Asset>>) => void;
    setCurrentVariableAsset: (id: string) => void;
    setAddCurrentVariableAsset: (id: string) => void;
    setCurrentVariableSwapAsset: (id: string) => void;
    setSwapBtnError: (err: O.Option<SwapBtnError>) => void;
    setResultBottomSheetIsOpen: (isOpen: boolean) => void;
    setSelectAssetBottomSheetIsOpen: (isOpen: boolean) => void;
    setResultStatus: (status: SwapResultStatus) => void;
}

export type NewSwapStore = ValueWithEffect<SwapStore>;

export const newSwapStore = injectable(
    newWaletRestService,
    newSwapRestService,
    (walletService, swapRestService) => (): NewSwapStore => {
        //#region Atoms
        const {
            state: allAssets,
            set: setAllAssets,
            get: geyAllAssets,
        } = newAtomState<E.Either<string, Array<FiltrebleSwapAsset>>>(
            E.left('pending')
        );

        const {
            state: waletAssets,
            set: setWaletAssets,
            get: getWaletAssets,
        } = newAtomState<E.Either<string, Array<Asset>>>(E.left('pending'));

        const {
            state: swapAssets,
            set: setSwapAssets,
            get: getSwapAssets,
        } = newAtomState<E.Either<string, Array<SwapAsset>>>(E.left('pending'));

        const swapListInfo =
            newLensedAtom<DropdownOptions[]>(SWAP_LIST_INFO_INIT);

        const resultSwapListInfo = newLensedAtom<ResultOptions[]>([]);

        const {
            state: selectAssetBottomSheetIsOpen,
            set: setSelectAssetBottomSheetIsOpen,
        } = newAtomState(false);
        const addAssetBottomSheetIsOpen = newLensedAtom(false);

        const {
            state: resultBottomSheetIsOpen,
            set: setResultBottomSheetIsOpen,
        } = newAtomState(false);
        const { state: resultStatus, set: setResultStatus } =
            newAtomState<SwapResultStatus>('PROGRESS');

        const currentVariableSwapAsset = newLensedAtom('');
        const [setCurrentVariableAsset, currentVariableAsset] =
            createAdapter<string>();

        const [setAddCurrentVariableAsset, addCurrentVariableAsset] =
            createAdapter<string>();

        const [onRemoveAsset, removeAssetEvent] = createAdapter<string>();
        const [onSearchAssets, onSearchAssetsEvent] = createAdapter<string>();

        const { state: swapBtnError, set: setSwapBtnError } = newAtomState<
            O.Option<SwapBtnError>
        >(O.some('EMPTY_FIELD'));

        //#region Functions
        const closeResultBottomSheet = () => resultBottomSheetIsOpen.set(false);

        const onOpenaAddAssetBottomSheetIsOpen = () =>
            addAssetBottomSheetIsOpen.set(true);
        const onCloseAddAssetBottomSheetIsOpen = () =>
            addAssetBottomSheetIsOpen.set(false);

        const setCurrentVariableSwapAsset = currentVariableSwapAsset.set;

        const swapTokenOrder = () =>
            pipe(getSwapAssets(), E.map(A.reverse), setSwapAssets);

        //#region EFFECTS
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
                setWaletAssets(waletAssetsResp);
                pipe(
                    E.Do,
                    E.bind('waletAssetsResp', constant(waletAssetsResp)),
                    E.bind('assets', constant(assets)),
                    E.map(({ assets, waletAssetsResp }) => {
                        const waletAssetsRespSet = new Set(
                            waletAssetsResp.map((el) => el.id)
                        );
                        const { left, right } = pipe(
                            assets,
                            A.partition((asset) =>
                                waletAssetsRespSet.has(asset.id)
                            )
                        );

                        return [...right, ...left];
                    }),
                    E.map(A.map(mapAssetToFiltrebleSwapAsset)),
                    setAllAssets
                );

                getAssetsEffectMapping(assets, getWaletAssets(), setSwapAssets);
            })
        );

        const onAssetSelectEvent = pipe(
            currentVariableAsset,
            tap((id) => {
                const currentAllAssets = geyAllAssets();
                const currentWaletAssets = getWaletAssets();
                const currentSwapAssets = getSwapAssets();

                const currentHeadSwapAsset = pipe(
                    currentSwapAssets,
                    E.chain(flow(A.head, E.fromOption(constant('error')))),
                    E.fold(constUndefined, identity)
                );

                const currentWaletAsset = getCurrentWaletAsset(
                    currentWaletAssets,
                    id
                );

                const isIdExistOnSwapAssets = !getIsIdExistOnSwapAssets(
                    currentSwapAssets,
                    id
                );

                if (isIdExistOnSwapAssets) {
                    setSelectAssetBottomSheetIsOpen(false);

                    pipe(
                        getSwapAssets(),
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
                        setSwapAssets
                    );
                }
            })
        );

        const onAssetAddEvent = pipe(
            addCurrentVariableAsset,
            tap((id) => {
                const currentAllAssets = geyAllAssets();
                const currentWaletAssets = getWaletAssets();
                const currentSwapAssets = getSwapAssets();

                const currentWaletAsset = getCurrentWaletAsset(
                    currentWaletAssets,
                    id
                );

                const isIdExistOnSwapAssets = !getIsIdExistOnSwapAssets(
                    currentSwapAssets,
                    id
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
                        setSwapAssets
                    );
                }
            })
        );

        const removeAssetEffect = pipe(
            removeAssetEvent,
            tap((id) => {
                const currentSwapAssets = getSwapAssets();
                pipe(
                    currentSwapAssets,
                    E.map(A.filter(({ id: assetId }) => assetId !== id)),
                    setSwapAssets
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
                                        ((headAsset.currentValue *
                                            headAsset.price) /
                                            last.price) *
                                        SHODOW_SWAP;
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
                            result: {
                                name: `Total amount in ${data.ticker}`,
                                value: data.balance,
                            },
                            details: {
                                name: `${data.ticker} balance after swap`,
                                value: [data.balance],
                            },
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
                                      result: {
                                          name: `Total amount in ${data.ticker}`,
                                          value: data.balance,
                                      },
                                      details: {
                                          name: `${data.ticker} balance after swap`,
                                          value: [data.balance],
                                      },
                                  },
                        (data) => ({
                            result: {
                                name: `Total amount in ${data.ticker}`,
                                value: data.balance,
                            },
                            details: {
                                name: `${data.ticker} balance after swap`,
                                value: [data.balance],
                            },
                        })
                    )
                );

                const newSwapListInfo: DropdownOptions[] = [
                    {
                        name: 'Exchange rate',
                        value: exchangeRate,
                    },
                    { name: 'Minimum received', value: minimumReceived },
                    baseAssetAfterSwap?.details,
                    lastAssetAfterSwap?.details,
                ].filter((x) => x !== null && x !== undefined);

                const newSwapResultListInfo: ResultOptions[] = [
                    baseAssetAfterSwap?.result,
                    lastAssetAfterSwap?.result,
                ].filter((x) => x !== null && x !== undefined);

                swapListInfo.set(newSwapListInfo);
                resultSwapListInfo.set(newSwapResultListInfo);
            })
        );

        const onSearchAssetsEffect = pipe(
            onSearchAssetsEvent,
            tap((tickerName) => {
                pipe(
                    geyAllAssets(),
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
                    setAllAssets
                );
            })
        );

        return valueWithEffect.new(
            {
                swapAssets,
                selectAssetBottomSheetIsOpen,
                addAssetBottomSheetIsOpen,
                allAssets,
                swapListInfo,
                resultBottomSheetIsOpen,
                resultStatus,
                swapBtnError,
                resultSwapListInfo,

                onOpenaAddAssetBottomSheetIsOpen,
                onCloseAddAssetBottomSheetIsOpen,
                swapTokenOrder,
                onRemoveAsset,
                onSearchAssets,
                closeResultBottomSheet,

                getWaletAssets,
                getSwapAssets,

                setWaletAssets,
                setCurrentVariableAsset,
                setAddCurrentVariableAsset,
                setCurrentVariableSwapAsset,
                setAllAssets,
                setSwapAssets,
                setSwapBtnError,
                setResultBottomSheetIsOpen,
                setSelectAssetBottomSheetIsOpen,
                setResultStatus,
            },
            getAssetsEffect,
            onAssetSelectEvent,
            onAssetAddEvent,
            removeAssetEffect,
            swapListInfoChangeEffect,
            onSearchAssetsEffect
        );
    }
);
