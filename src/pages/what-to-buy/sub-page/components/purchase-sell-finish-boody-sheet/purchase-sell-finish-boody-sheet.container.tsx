import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import { PurchaseSellFinishBoodySheet } from './purchase-sell-finish-boody-sheet.component';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { PageType } from '@/pages/what-to-buy/what-to-buy.model';
import { pipe } from 'fp-ts/lib/function';
import { FundsData } from '@/pages/whalet/whalet.model';

interface PurchaseSellFinishBoodySheetContainerProps {
    type?: PageType;
}

export const PurchaseSellFinishBoodySheetContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) =>
        ({ type: typePage }: PurchaseSellFinishBoodySheetContainerProps) => {
            //TODO TypeCast
            const fundData = pipe(
                useProperty(store.fundData),
                E.getOrElse(() => ({}) as FundsData)
            );

            const totalAmount = pipe(
                useProperty(store.totalAmount),
                O.getOrElse(() => ({ currency: 0, coin: 0 }))
            );

            const value = fundData.cost;
            const name = fundData.name;
            const logo = fundData.logo;
            const quantity = useProperty(store.quantity);
            const type = typePage ?? 'SELL';

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
