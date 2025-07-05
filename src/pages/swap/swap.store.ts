import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { combine, tap } from '@most/core';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import * as t from 'io-ts';
import {
    constant,
    constUndefined,
    flow,
    identity,
    pipe,
} from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import { injectable, token } from '@injectable-ts/core';
import { newWalletRestService } from '@/API/wallet.service';
import {
    FiltrebleSwapAsset,
    getAssetsEffectMapping,
    mapAssetToFiltrebleSwapAsset,
    mapAssetToSwapAsset,
    mapOptionsToShow,
    prepareMapSwapAfterSwap,
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
import { AssetBalance } from '@/instance/asset/asset.model';
import { I18NService } from '@/store/i18n/i18.store';
import { formatNumberExponent } from '@/utils/number';
import { ERROR, Error, PENDING } from '@/store/errors/error-system';
import { assetsRestService } from '@/API/assets/assets.service';

export interface SwapStore {
    //#region state
    swapAssets: Property<E.Either<Error, Array<SwapAsset>>>;
    allAssets: Property<E.Either<Error, Array<FiltrebleSwapAsset>>>;
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
    getWaletAssets: () => E.Either<Error, Array<AssetBalance>>;
    getSwapAssets: () => E.Either<Error, SwapAsset[]>;

    //#region set
    setSwapAssets: (assets: E.Either<Error, Array<SwapAsset>>) => void;
    setAllAssets: (assets: E.Either<Error, Array<FiltrebleSwapAsset>>) => void;
    setWaletAssets: (asset: E.Either<Error, Array<AssetBalance>>) => void;
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
    newWalletRestService,
    token('i18n')<I18NService>(),
    assetsRestService,
    (walletService, i18n, assetsRestService) => (): NewSwapStore => {
        const { details: i18nDetails, result: i18nResult } = i18n.Swap.get();
        //#region Atoms
        const {
            state: allAssets,
            set: setAllAssets,
            get: getAllAssets,
        } = newAtomState<E.Either<Error, Array<FiltrebleSwapAsset>>>(
            E.left(PENDING)
        );

        const {
            state: waletAssets,
            set: setWaletAssets,
            get: getWaletAssets,
        } = newAtomState<E.Either<Error, Array<AssetBalance>>>(E.left(PENDING));

        const {
            state: swapAssets,
            set: setSwapAssets,
            get: getSwapAssets,
        } = newAtomState<E.Either<Error, Array<SwapAsset>>>(E.left(PENDING));

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
                assetsRestService.getAllAssets(),
                walletService.getAssets()
            ),
            tap(({ assets, walletAssets: waletAssetsResp }) => {
                setWaletAssets(waletAssetsResp);
                if (E.isRight(waletAssetsResp)) {
                    pipe(
                        E.Do,
                        E.bind('waletAssetsResp', constant(waletAssetsResp)),
                        E.bind('assets', constant(assets)),
                        E.map(({ assets, waletAssetsResp }) => {
                            const waletAssetsRespSet = pipe(
                                waletAssetsResp,
                                A.map((x) => x.id),
                                A.uniq(S.Eq)
                            );

                            const { left, right } = pipe(
                                assets,
                                A.partition((asset) =>
                                    waletAssetsRespSet.includes(asset.id)
                                )
                            );
                            return [...right, ...left];
                        }),
                        E.map(A.map(mapAssetToFiltrebleSwapAsset)),
                        setAllAssets
                    );
                } else {
                    pipe(
                        assets,
                        E.map(A.map(mapAssetToFiltrebleSwapAsset)),
                        setAllAssets
                    );
                }

                getAssetsEffectMapping(assets, getWaletAssets(), setSwapAssets);
            })
        );

        const onAssetSelectEvent = pipe(
            currentVariableAsset,
            tap((id) => {
                const currentAllAssets = getAllAssets();
                const currentWaletAssets = getWaletAssets();
                const currentSwapAssets = getSwapAssets();

                const currentHeadSwapAsset = pipe(
                    currentSwapAssets,
                    E.chain(flow(A.head, E.fromOption(constant(ERROR)))),
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
                                                E.fromOption(constant(ERROR)),
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
                const currentAllAssets = getAllAssets();
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
                            E.fromOption(constant(ERROR)),
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
                                        return `1 ${headAsset.assetName} ≈ ${formatNumberExponent(headAsset.price / tail.price)} ${tail.assetName}`;
                                    }
                                    return '';
                                })
                            ),
                            E.fromOption(constant(ERROR))
                        );
                    }),
                    E.getOrElseW(() => [])
                );

                const minimumReceived = pipe(
                    assets,
                    E.map((assets) => ({
                        head: pipe(assets, A.head),
                        tail: pipe(assets, A.last),
                    })),
                    E.chain(({ head, tail }) => {
                        const headAsset = pipe(
                            head,
                            O.getOrElseW(constUndefined)
                        );

                        return pipe(
                            tail,
                            O.map((tail) => {
                                if (headAsset) {
                                    const received =
                                        ((headAsset.currentValue *
                                            headAsset.price) /
                                            tail.price) *
                                        SHODOW_SWAP;

                                    return [
                                        `${Number.isNaN(received) ? 0 : formatNumberExponent(received)} ${tail.assetName}`,
                                    ];
                                }
                                return [''];
                            }),
                            E.fromOption(constant(ERROR))
                        );
                    }),
                    E.getOrElseW(() => [])
                );

                const baseAssetAfterSwap = pipe(
                    assets,
                    E.chain(flow(A.head, E.fromOption(constant(ERROR)))),
                    E.chain((asset) =>
                        pipe(
                            currentWaletAsset,
                            E.chain(prepareMapSwapAfterSwap(asset, 'minus'))
                        )
                    ),
                    E.fold(
                        () => null,
                        mapOptionsToShow({
                            detailsName: i18nDetails.afterSwap,
                            resultName: i18nResult.totalAmount,
                        })
                    )
                );

                const lastAssetAfterSwap = pipe(
                    assets,
                    E.chain(flow(A.last, E.fromOption(constant(ERROR)))),
                    E.chain((asset) =>
                        pipe(
                            currentWaletAsset,
                            E.chainW(
                                flow(
                                    prepareMapSwapAfterSwap(asset, 'plus'),
                                    E.mapLeft(() => ({
                                        ticker: asset.assetName,
                                        balance: `${formatNumberExponent(asset.currentValue)}`,
                                    }))
                                )
                            )
                        )
                    ),
                    E.fold(
                        (data) =>
                            t.string.is(data)
                                ? null
                                : mapOptionsToShow({
                                      detailsName: i18nDetails.afterSwap,
                                      resultName: i18nResult.totalAmount,
                                  })(data),
                        mapOptionsToShow({
                            detailsName: i18nDetails.afterSwap,
                            resultName: i18nResult.totalAmount,
                        })
                    )
                );

                const newSwapListInfo: DropdownOptions[] = [
                    {
                        name: i18nDetails.rate,
                        value: exchangeRate,
                    },
                    { name: i18nDetails.minimum, value: minimumReceived },
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
                    getAllAssets(),
                    E.map(
                        A.map((asset) => ({
                            ...asset,
                            isVisible: asset.ticker
                                .toLowerCase()
                                .includes(tickerName.toLowerCase()),
                        }))
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
