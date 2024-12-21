import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import PurchaseSellContentCard from './purchase-sell-content-card.component';
import * as E from 'fp-ts/Either';
import {
    isAssetAvailible,
    mapAssetToUICard,
    PageType,
} from '@/pages/what-to-buy/what-to-buy.model';
import { pipe } from 'fp-ts/lib/function';

interface PurchaseSellContentCardContainerProps {
    type: PageType;
}

export const PurchaseSellContentCardContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    PurchaseSellContentCard,
    (store, PurchaseSellContentCard) =>
        ({ type }: PurchaseSellContentCardContainerProps) => {
            const totalAmount = useProperty(store.totalAmount);
            const asset = useProperty(store.selectedAssets);
            const maxAvailableBuy = useProperty(store.maxAvailableBuy);
            const maxAvailableSell = useProperty(store.maxAvailableSell);

            //TODO: По хорошому вынести в локальную вьюху но мне лень
            const assetCardData = pipe(
                asset,
                E.map((asset) =>
                    mapAssetToUICard(asset, isAssetAvailible(type))
                )
            );

            const maxAvailable =
                type === 'BUY' ? maxAvailableBuy : maxAvailableSell;

            return React.createElement(PurchaseSellContentCard, {
                ...store,
                totalAmount,
                maxAvailable,
                asset,
                assetCardData,
                onClick: () => store.setIsBottomPanel(isAssetAvailible(type)),
                onMaxAvailableClick: store.onMaxAvailableClick(type),
            });
        }
);
