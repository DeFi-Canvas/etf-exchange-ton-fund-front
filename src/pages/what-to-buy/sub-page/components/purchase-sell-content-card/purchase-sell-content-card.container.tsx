import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import PurchaseSellContentCard from './purchase-sell-content-card.component';
import * as E from 'fp-ts/Either';
import { Asset } from '@/pages/whalet/whalet.model';
import {
    isAssetAvailible,
    mapAssetToUICard,
    PageType,
} from '@/pages/what-to-buy/what-to-buy.model';

interface PurchaseSellContentCardContainerProps {
    type: PageType;
}

export const PurchaseSellContentCardContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    PurchaseSellContentCard,
    (store, PurchaseSellContentCard) =>
        ({ type }: PurchaseSellContentCardContainerProps) => {
            const totalAmount = useProperty(store.totalAmount);
            const selectedAssets = useProperty(store.selectedAssets);
            const maxQuantity = useProperty(store.maxAvailableBuy);

            // TODO: переписать на RenderEither
            const currentSelectedAssets = E.isRight(selectedAssets)
                ? selectedAssets.right
                : ({} as Asset);
            const assetCardDataContentCard = mapAssetToUICard(
                currentSelectedAssets,
                isAssetAvailible(type)
            );

            return React.createElement(PurchaseSellContentCard, {
                ...store,
                totalAmount,
                assetCardData: assetCardDataContentCard,
                onClick: () => store.setIsBottomPanel(isAssetAvailible(type)),
                maxQuantity,
            });
        }
);
