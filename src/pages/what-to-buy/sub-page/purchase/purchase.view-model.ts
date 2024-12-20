import { injectable } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/lib/function';
import { chain, combine, take, tap } from '@most/core';
import { newWTBRestService } from '@/API/wtb.service';
import { newWaletRestService } from '@/API/whalet.service';
import { Asset, FundsData } from '@/pages/whalet/whalet.model';
import { fromProperty } from '@/utils/property.utils';
import { createAdapter } from '@most/adapter';
import { PageType } from '../../what-to-buy.model';

export interface TotalAmount {
    currency: number;
    coin: number;
}

export interface PurchaseSellStore {
    funds: Property<E.Either<string, Array<FundsData>>>;
    fundData: Property<E.Either<string, FundsData>>;
    assets: Property<E.Either<string, Array<Asset>>>;
    selectedAssets: Property<E.Either<string, Asset>>;
    totalAmount: Property<O.Option<TotalAmount>>;
    quantity: Property<number>;
    setQuantity: (quantity: number) => void;
    isBottomPanel: Property<boolean>;
    isShowBottomSheetFinishBoody: Property<boolean>;
    isLoading: Property<boolean>;
    fundsAvailableSale: Property<E.Either<string, Array<FundsData>>>;
    onBuy: () => void;
    onSell: () => void;
    setIsBottomPanel: (x: boolean) => void;
    maxAvailableBuy: Property<number>;
    maxAvailableSell: Property<number>;
    onMaxAvailableClick: (type: PageType) => () => void;
}

export interface NewPurchaseSellStore {
    (id?: string): ValueWithEffect<PurchaseSellStore>;
}
export const newPurchaseSellStore = injectable(
    newWTBRestService,
    newWaletRestService,
    (service, walletService): NewPurchaseSellStore =>
        (id) => {
            const funds = newLensedAtom<E.Either<string, Array<FundsData>>>(
                E.left('pending')
            );
            const fundsAvailableSale = newLensedAtom<
                E.Either<string, Array<FundsData>>
            >(E.left('none'));
            const fundData = newLensedAtom<E.Either<string, FundsData>>(
                E.left('pending')
            );
            const assets = newLensedAtom<E.Either<string, Array<Asset>>>(
                E.left('pending')
            );

            const selectedAssets = newLensedAtom<E.Either<string, Asset>>(
                E.left('pending')
            );
            const selectedAssetsId = newLensedAtom<string>('');

            const totalAmount = newLensedAtom<O.Option<TotalAmount>>(
                O.of({ currency: 0, coin: 0 })
            );
            const quantity = newLensedAtom(0);
            const setQuantity = quantity.set;
            const maxAvailableBuy = newLensedAtom(0);
            const maxAvailableSell = newLensedAtom(0);
            const isBottomPanel = newLensedAtom(false);
            const isShowBottomSheetFinishBoody = newLensedAtom(false);
            const isLoading = newLensedAtom(false);

            const [onBuy, onBuyEvent] = createAdapter<void>();
            const [onSell, onSellEvent] = createAdapter<void>();

            const setIsBottomPanel = isBottomPanel.set;

            const onMaxAvailableClick = (type: PageType) => () => {
                if (type === 'BUY') {
                    quantity.set(maxAvailableBuy.get());
                } else {
                    quantity.set(maxAvailableSell.get());
                }
            };

            const getFundDataEffect = pipe(
                service.getFund(id ?? ''),
                tap(fundData.set)
            );

            const getAssetsEffect = pipe(
                walletService.getAssets(),
                tap((assetsResponce) => {
                    assets.set(assetsResponce);
                    pipe(
                        assetsResponce,
                        E.fold(constVoid, (x) => {
                            selectedAssetsId.set(x[0].name);
                        })
                    );
                })
            );
            const getFundsAvailableSaleEffect = pipe(
                combine(
                    (fundData, fundsAvailableSale) => ({
                        fundData,
                        fundsAvailableSale,
                    }),
                    pipe(fundData, fromProperty),
                    walletService.getWhaletFunds()
                ),
                tap(({ fundData, fundsAvailableSale: fundsAvailableSaleS }) => {
                    const fundDataId = pipe(
                        fundData,
                        E.map(({ id }) => id),
                        E.getOrElse(() => '')
                    );
                    const newFundsAvailableSale = pipe(
                        fundsAvailableSaleS,
                        E.chain((fundData) => {
                            const fundDataFiltred = fundData.filter(
                                ({ id }) => fundDataId === id
                            )[0];
                            if (fundDataFiltred) {
                                return E.right([fundDataFiltred]);
                            } else {
                                return E.left('err');
                            }
                        })
                    );
                    fundsAvailableSale.set(newFundsAvailableSale);
                })
            );

            const selectedAssetsEffect = pipe(
                selectedAssetsId,
                fromProperty,
                tap((x) =>
                    pipe(
                        assets.get(),
                        E.map(
                            (assets) =>
                                assets.find((asset) => asset.name === x) ??
                                ({} as Asset)
                        ),
                        selectedAssets.set
                    )
                )
            );

            const quantityEffect = pipe(
                quantity,
                fromProperty,
                tap((x) => {
                    const currentFund = pipe(
                        fundData.get(),
                        E.getOrElse(() => ({}) as FundsData)
                    );
                    const currentAsset = pipe(
                        selectedAssets.get(),
                        E.getOrElse(() => ({}) as Asset)
                    );
                    const currency = x * currentFund.cost;
                    const coin = currency / currentAsset.price;
                    if (!Number.isNaN(coin))
                        totalAmount.set(O.of({ currency, coin }));
                })
            );

            const onBuyEffect = pipe(
                onBuyEvent,
                take(1),
                tap(() => isLoading.set(true)),
                chain(() => {
                    const currentFund = pipe(
                        fundData.get(),
                        E.getOrElse(() => ({}) as FundsData)
                    );

                    const currentAsset = pipe(
                        selectedAssets.get(),
                        E.getOrElse(() => ({}) as Asset)
                    );
                    return service.buyFund({
                        fundId: currentFund.id,
                        assetId: currentAsset.id,
                        amount: quantity.get(),
                    });
                }),
                tap(() => {
                    isLoading.set(false);
                    isShowBottomSheetFinishBoody.set(true);
                })
            );

            const onSellEffect = pipe(
                onSellEvent,
                take(1),
                tap(() => isLoading.set(true)),
                chain(() => {
                    const currentFund = pipe(
                        fundData.get(),
                        E.getOrElse(() => ({}) as FundsData)
                    );

                    const currentAsset = pipe(
                        selectedAssets.get(),
                        E.getOrElse(() => ({}) as Asset)
                    );
                    return service.sellFund({
                        fundId: currentFund.id,
                        amount:
                            maxAvailableSell.get() > 0
                                ? quantity.get() - currentAsset.price / 2
                                : quantity.get(),
                    });
                }),
                tap(() => {
                    isLoading.set(false);
                    isShowBottomSheetFinishBoody.set(true);
                })
            );

            const getFundsEffect = pipe(
                walletService.getFunds(),
                tap(funds.set)
            );

            const getMaxAvailableSellEffect = pipe(
                fundData,
                fromProperty,
                chain(() => walletService.getWhaletFunds()),
                tap((fundsData) => {
                    const maxAvailableSize = pipe(
                        fundData.get(),
                        E.chain((fundData) => {
                            return pipe(
                                fundsData,
                                E.map(
                                    (fundsData) =>
                                        fundsData.filter(
                                            ({ id }) => id === fundData.id
                                        )[0]
                                )
                            );
                        }),
                        E.fold(
                            () => 0,
                            ({ cost }) => cost
                        )
                    );

                    maxAvailableSell.set(maxAvailableSize);
                })
            );

            const getMaxAvailableBuyEffect = pipe(
                selectedAssets,
                fromProperty,
                tap((selectedAssets) => {
                    const currentAsset = pipe(
                        selectedAssets,
                        E.getOrElse(() => ({}) as Asset)
                    );
                    maxAvailableBuy.set(currentAsset.value);
                })
            );
            return valueWithEffect.new(
                {
                    fundData,
                    assets,
                    selectedAssets,
                    totalAmount,
                    quantity,
                    onBuy,
                    isBottomPanel,
                    setIsBottomPanel,
                    funds,
                    isShowBottomSheetFinishBoody,
                    isLoading,
                    fundsAvailableSale,
                    maxAvailableBuy,
                    onSell,
                    setQuantity,
                    maxAvailableSell,
                    onMaxAvailableClick,
                },
                getFundDataEffect,
                getAssetsEffect,
                selectedAssetsEffect,
                quantityEffect,
                onBuyEffect,
                getFundsEffect,
                onBuyEffect,
                getFundsAvailableSaleEffect,
                getMaxAvailableBuyEffect,
                onSellEffect,
                getMaxAvailableSellEffect
            );
        }
);
