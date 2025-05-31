import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '@/pages/what-to-buy/sub-page/purchase/purchase.store';
import { Footer } from './footer.component';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import { I18NService } from '@/store/i18n/i18.store';

export const FooterContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    token('i18n')<I18NService>(),

    (store, i18n) => () => {
        const fundsAvailableSale = useProperty(store.fundsAvailableSale);
        const { Fund: texts } = useProperty(i18n.WhatToBuy);

        return React.createElement(Footer, {
            fundsAvailableSale,
            texts,
        });
    }
);
