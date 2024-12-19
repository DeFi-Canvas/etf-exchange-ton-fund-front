import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import About from './about.component';
import { PurchaseSellStore } from '../../../purchase/purchase.view-model';

export const AboutContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const fund = useProperty(store.fundData);

        return React.createElement(About, {
            fund,
        });
    }
);
