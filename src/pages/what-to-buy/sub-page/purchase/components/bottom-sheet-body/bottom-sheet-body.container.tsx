import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import * as E from 'fp-ts/Either';
import { Asset } from '@/pages/whalet/whalet.model';
import { BottomSheetBody } from './bottom-sheet-body';
import { InterfacePurchaseSellAssetCardData } from '../../../types';
import { useProperty } from '@frp-ts/react';
import { PurchaseViewModel } from '../../purchase.view-model';

export const BottomSheetBodyContainer = injectable(
    token('purchaseStore')<PurchaseViewModel>(),
    (store) => () => {
        const assets = useProperty(store.assets);

        const currentAssets: Array<Asset> = E.isRight(assets)
            ? assets.right
            : ([] as Array<Asset>);
        const data: InterfacePurchaseSellAssetCardData[] = currentAssets.map(
            (d) => ({
                imageSrc: d.image_url,
                title: d.symbol,
                subTitle: d.name,
                price: `${d.price}`,
                allowedOpen: false,
            })
        );
        return React.createElement(BottomSheetBody, { data });
    }
);
