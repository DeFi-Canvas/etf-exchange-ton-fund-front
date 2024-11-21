import { injectable, token } from '@injectable-ts/core';
import { PurchaseViewModel } from '../../purchase/purchase.view-model';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import PurchaseSellContentCard from './purchase-sell-content-card.component';
import * as E from 'fp-ts/Either';
import { Asset } from '@/pages/whalet/whalet.model';
import { mapAssetToUICard } from '@/pages/what-to-buy/what-to-buy.model';

export const PurchaseSellContentCardContainer = injectable(
    token('purchaseStore')<PurchaseViewModel>(),
    PurchaseSellContentCard,
    (store, PurchaseSellContentCard) => () => {
        const totalAmount = useProperty(store.totalAmount);
        const selectedAssets = useProperty(store.selectedAssets);

        // TODO: переписать на RenderEither
        const currentSelectedAssets = E.isRight(selectedAssets)
            ? selectedAssets.right
            : ({} as Asset);
        const assetCardDataContentCard = mapAssetToUICard(
            currentSelectedAssets
        );

        return React.createElement(PurchaseSellContentCard, {
            ...store,
            totalAmount,
            assetCardData: assetCardDataContentCard,
            onClick: () => store.setIsBottomPanel(true),
        });
    }
);
