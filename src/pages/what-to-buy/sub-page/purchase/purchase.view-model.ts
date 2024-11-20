import { injectable } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/lib/function';
import { chain, tap } from '@most/core';
import { newWTBRestService } from '@/API/wtb.service';
import { FundsData } from '../../what-to-buy.model';
import { newWaletRestService } from '@/API/whalet.service';
import { Asset } from '@/pages/whalet/whalet.model';
import { fromProperty } from '@/utils/property.utils';
import { createAdapter } from '@most/adapter';

export interface TotalAmount {
    currency: number;
    coin: number;
}

export interface purchaseViewModel {
    fundData: Property<E.Either<string, FundsData>>;
    assets: Property<E.Either<string, Array<Asset>>>;
    selectedAssets: Property<E.Either<string, Asset>>;
    totalAmount: Property<O.Option<TotalAmount>>;
    quantity: Property<number>;
    increment: () => void;
    dicrement: () => void;
    onBuy: () => void;
}

export interface NewPurchaseViewModel {
    (): ValueWithEffect<purchaseViewModel>;
}

export const newPurchaseViewModel = injectable(
    newWTBRestService,
    newWaletRestService,
    (service, walletService): NewPurchaseViewModel =>
        () => {
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

            const [onBuy, onBuyEvent] = createAdapter<void>();

            const increment = () => {
                quantity.modify((x) => x + 1);
            };
            const dicrement = () => {
                quantity.modify((x) => x - 1);
            };

            const getFundDataEffect = pipe(
                service.getFund(),
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
                        E.getOrElse(() => ({} as FundsData))
                    );
                    const currentAsset = pipe(
                        selectedAssets.get(),
                        E.getOrElse(() => ({} as Asset))
                    );
                    const currency = x * currentFund.cost;
                    const coin = currency / currentAsset.price;
                    if (!Number.isNaN(coin))
                        totalAmount.set(O.of({ currency, coin }));
                })
            );

            const onBuyEffect = pipe(
                onBuyEvent,
                chain(() => {
                    const currentFund = pipe(
                        fundData.get(),
                        E.getOrElse(() => ({} as FundsData))
                    );
                    const currentAsset = pipe(
                        selectedAssets.get(),
                        E.getOrElse(() => ({} as Asset))
                    );
                    return service.buyFund({
                        fundId: currentFund.id,
                        assetId: '',
                        amount: quantity.get(),
                    });
                })
            );

            return valueWithEffect.new(
                {
                    fundData,
                    assets,
                    selectedAssets,
                    totalAmount,
                    quantity,
                    increment,
                    dicrement,
                    onBuy,
                },
                getFundDataEffect,
                getAssetsEffect,
                selectedAssetsEffect,
                quantityEffect,
                onBuyEffect
            );
        }
);
