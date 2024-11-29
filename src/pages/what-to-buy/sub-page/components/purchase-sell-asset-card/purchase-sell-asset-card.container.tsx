import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import * as E from 'fp-ts/Either';
import { useProperty } from '@frp-ts/react';
import {
    isAssetAvailible,
    mapFundToUICard,
    PageType,
} from '@/pages/what-to-buy/what-to-buy.model';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import PurchaseSellAssetCard from './purchase-sell-asset-card.component';
import { FundsData } from '@/pages/whalet/whalet.model';

interface PurchaseSellAssetCardContainerProps {
    type: PageType;
}

export const PurchaseSellAssetCardContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) =>
        ({ type }: PurchaseSellAssetCardContainerProps) => {
            const funds = useProperty(store.fundData);

            // TODO: переписать на RenderEither
            const fundsAssets: FundsData = E.isRight(funds)
                ? funds.right
                : ({} as FundsData);
            const data = mapFundToUICard(fundsAssets, !isAssetAvailible(type));

            return React.createElement(PurchaseSellAssetCard, {
                ...data,
                onClick: () => store.setIsBottomPanel(!isAssetAvailible(type)),
            });
        }
);
