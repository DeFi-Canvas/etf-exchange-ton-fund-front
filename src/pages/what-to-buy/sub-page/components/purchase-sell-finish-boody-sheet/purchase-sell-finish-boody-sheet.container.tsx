import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import { PurchaseSellFinishBoodySheet } from './purchase-sell-finish-boody-sheet.component';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { FundsData } from '@/pages/what-to-buy/what-to-buy.model';
import { pipe } from 'fp-ts/lib/function';

export const PurchaseSellFinishBoodySheetContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        console.log(
            useProperty(store.fundData),
            'useProperty(store.fundData),'
        );

        const fundData = pipe(
            useProperty(store.fundData),
            E.getOrElse(() => ({} as FundsData))
        );

        const totalAmount = pipe(
            useProperty(store.totalAmount),
            O.getOrElse(() => ({ currency: 0, coin: 0 }))
        );

        const value = fundData.cost;
        const name = fundData.name;
        const logo = fundData.logo;
        const quantity = useProperty(store.quantity);
        const type = 'SELL';

        return React.createElement(PurchaseSellFinishBoodySheet, {
            value,
            name,
            logo,
            quantity,
            type,
            totalAmount: totalAmount.currency,
        });
    }
);
