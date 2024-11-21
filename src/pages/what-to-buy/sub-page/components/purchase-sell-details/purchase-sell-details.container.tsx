import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import * as O from 'fp-ts/Option';
import { useProperty } from '@frp-ts/react';
import PurchaseSellDetails, {
    PurchaseSellDetailsProps,
} from './purchase-sell-details.component';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';

interface PurchaseSellDetailsContainerProps
    extends Omit<PurchaseSellDetailsProps, 'details'> {}

export const PurchaseSellDetailsContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => (props: PurchaseSellDetailsContainerProps) => {
        const totalValue = pipe(
            useProperty(store.totalAmount),
            O.getOrElse(() => ({
                currency: 0,
                coin: 0,
            }))
        );

        const details = [
            { title: 'Commission', value: '$ 0' },
            { title: 'Total in USD', value: `$ ${totalValue.currency}` },
            { title: 'Total in TON', value: `${totalValue.coin}` },
        ];
        return React.createElement(PurchaseSellDetails, { ...props, details });
    }
);