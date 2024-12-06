import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import React from 'react';
import PurchaseSellFieldCounter from './purchase-sell-field-counter.component';

export const PurchaseSellFieldCounterContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        return React.createElement(PurchaseSellFieldCounter, {
            ...store,
            setValue: store.setQuantity,
        });
    }
);
