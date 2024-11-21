import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import * as E from 'fp-ts/Either';
import { BottomSheetBody } from './bottom-sheet-body';
import { InterfacePurchaseSellAssetCardData } from '../../../types';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../purchase.view-model';
import {
    FundsData,
    mapFundToUICard,
} from '@/pages/what-to-buy/what-to-buy.model';

export const BottomSheetSellBodyContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const funds = useProperty(store.funds);

        const fundsAssets: Array<FundsData> = E.isRight(funds)
            ? funds.right
            : ([] as Array<FundsData>);
        const data: InterfacePurchaseSellAssetCardData[] = fundsAssets.map(
            (e) => mapFundToUICard(e, false)
        );
        return React.createElement(BottomSheetBody, { data });
    }
);
