import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import * as E from 'fp-ts/Either';
import { Asset } from '@/pages/whalet/whalet.model';
import { BottomSheetBody } from './bottom-sheet-body';
import { InterfacePurchaseSellAssetCardData } from '../../../types';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../purchase.view-model';
import { mapAssetToUICard } from '@/pages/what-to-buy/what-to-buy.model';

export const BottomSheetPurchaseBodyContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const assets = useProperty(store.assets);

        // TODO: переписать на RenderEither
        const currentAssets: Array<Asset> = E.isRight(assets)
            ? assets.right
            : ([] as Array<Asset>);
        const data: InterfacePurchaseSellAssetCardData[] = currentAssets.map(
            (e) => mapAssetToUICard(e, false)
        );
        return React.createElement(BottomSheetBody, { data });
    }
);
