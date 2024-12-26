import { injectable, token } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import { constant, flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { fromProperty } from '@/utils/property.utils';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import { InterfacePurchaseSellAssetCardData } from '../../types';
import {
    isAssetAvailible,
    mapAssetToUICard,
    PageType,
} from '@/pages/what-to-buy/what-to-buy.model';

export interface PurchaseSellContentCardViewModel {
    maxAvailable: Property<number>;
    assetCardData: Property<
        E.Either<string, InterfacePurchaseSellAssetCardData>
    >;
    assetName: Property<string>;

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
            const assetCardData = newLensedAtom<
                E.Either<string, InterfacePurchaseSellAssetCardData>
            >(E.left('pending'));
            const assetName = newLensedAtom('');

            const assetCardDataEffect = pipe(
                store.selectedAssets,
                fromProperty,
                tap(
                    flow(
                        E.map((asset) =>
                            mapAssetToUICard(asset, isAssetAvailible(type))
                        ),
                        assetCardData.set
                    )
                ),
                tap(
                    flow(
                        E.map(({ name }) => name),
                        E.getOrElse(constant('')),
                        assetName.set
                    )
                )
            );

            return valueWithEffect.new(
                {
                    assetCardData,
                    maxAvailable:
                        type === 'BUY'
                            ? store.maxAvailableBuy
                            : store.maxAvailableSell,
                    assetName,
                    onClick: () =>
                        store.setIsBottomPanel(isAssetAvailible(type)),
                    onMaxAvailableClick: store.onMaxAvailableClick(type),
                },
                assetCardDataEffect
            );
        }
);
