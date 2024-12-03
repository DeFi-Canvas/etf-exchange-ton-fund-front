import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../../purchase/purchase.view-model';
import Footer from './footer.component';

export const FooterContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const fundsAvailableSale = useProperty(store.fundsAvailableSale);
        return React.createElement(Footer, {
            fundsAvailableSale,
        });
    }
);
