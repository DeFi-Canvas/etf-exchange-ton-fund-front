import { injectable, token } from '@injectable-ts/core';
import { PurchaseViewModel } from '../../purchase/purchase.view-model';
import React from 'react';
import PurchaseSellFieldCounter from './purchase-sell-field-counter.component';
import { useProperty } from '@frp-ts/react';

export const PurchaseSellFieldCounterContainer = injectable(
    token('purchaseStore')<PurchaseViewModel>(),
    (store) => () => {
        const quantity = useProperty(store.quantity);
        return React.createElement(PurchaseSellFieldCounter, {
            ...store,
            quantity,
        });
    }
);
