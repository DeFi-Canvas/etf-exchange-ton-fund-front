import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import React from 'react';
import PurchaseSellFieldCounter from './purchase-sell-field-counter.component';
import { useProperty } from '@frp-ts/react';

export const PurchaseSellFieldCounterContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const quantity = useProperty(store.quantity);
        return React.createElement(PurchaseSellFieldCounter, {
            ...store,
            setValue: store.setQuantity,
            quantity,
        });
    }
);
