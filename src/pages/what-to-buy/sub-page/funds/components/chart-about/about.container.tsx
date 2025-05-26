import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import About from './about.component';
import { PurchaseSellStore } from '../../../purchase/purchase.store';
import { I18NService } from '@/store/i18n/i18.store';

export const AboutContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    token('i18n')<I18NService>(),

    (store, i18n) => () => {
        const fund = useProperty(store.fundData);
        const texts = useProperty(i18n.WhatToBuy);

        return React.createElement(About, {
            fund,
            texts: texts.Fund,
        });
    }
);
