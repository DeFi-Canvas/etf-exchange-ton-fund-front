import { injectable, token } from '@injectable-ts/core';
import { PurchaseViewModel } from '../../purchase/purchase.view-model';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import PurchaseSellContentCard from './purchase-sell-content-card.component';
import * as E from 'fp-ts/Either';
import { Asset } from '@/pages/whalet/whalet.model';

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
        //TODO: написать маппер
        const assetCardDataContentCard = {
            imageSrc: currentSelectedAssets.image_url,
            title: `${currentSelectedAssets.value} ${currentSelectedAssets.symbol}`,
            subTitle: `$ ${
                currentSelectedAssets.price * currentSelectedAssets.value
            }`,
            price: `${currentSelectedAssets.balance}`,
            allowedOpen: true,
            isBackgroundWhite: false,
        };
        return React.createElement(PurchaseSellContentCard, {
            ...store,
            totalAmount,
            assetCardData: assetCardDataContentCard,
        });
    }
);
