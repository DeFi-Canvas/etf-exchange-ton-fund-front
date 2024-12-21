import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '@/pages/what-to-buy/sub-page/purchase/purchase.store';
import { Footer } from './footer.component';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';

export const FooterContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const fundsAvailableSale = useProperty(store.fundsAvailableSale);
        const fundAvailablebuy = pipe(
            useProperty(store.fundData),
            E.map(({ isAvaiable }) => !isAvaiable)
        );
        return React.createElement(Footer, {
            fundsAvailableSale,
            fundAvailablebuy,
        });
    }
);
