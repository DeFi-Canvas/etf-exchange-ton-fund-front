import { injectable, token } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import * as P from '@frp-ts/fp-ts';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import { InterfacePurchaseSellAssetCardData } from '../../types';
import {
    isAssetAvailible,
    mapAssetToUICard,
    PageType,
} from '@/pages/what-to-buy/what-to-buy.model';
import { Errors } from '@/store/errors/erorr-systrm';

export interface PurchaseSellContentCardViewModel {
    maxAvailable: Property<number>;
    assetCardData: Property<
        E.Either<Errors, InterfacePurchaseSellAssetCardData>
    >;
    assetName: Property<E.Either<Errors, string>>;

    onClick: () => void;
    onMaxAvailableClick: () => void;
}

export interface NewPurchaseSellContentCardViewModel {
    (type: PageType): ValueWithEffect<PurchaseSellContentCardViewModel>;
}
export const newPurchaseSellContentCardViewModel = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store): NewPurchaseSellContentCardViewModel =>
        (type) => {
            const assetCardData = pipe(
                store.selectedAssets,
                P.map(
                    E.map((asset) =>
                        mapAssetToUICard(asset, isAssetAvailible(type))
                    )
                )
            );
            const assetName = pipe(
                store.selectedAssets,
                P.map(E.map(({ name }) => name))
            );
            return valueWithEffect.new({
                assetCardData,
                maxAvailable:
                    type === 'BUY'
                        ? store.maxAvailableBuy
                        : store.maxAvailableSell,
                assetName,
                // onClick: () => store.setIsBottomPanel(isAssetAvailible(type)),
                onClick: () => store.setIsBottomPanel(isAssetAvailible('SELL')),
                onMaxAvailableClick: store.onMaxAvailableClick(type),
            });
        }
);
