import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../../purchase/purchase.store';
import { pipe } from 'fp-ts/lib/function';
import ChartLines from './lines.component';
import { I18NService } from '@/store/i18n/i18.store';

export const ChartLinesContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    token('i18n')<I18NService>(),

    (store, i18n) => () => {
        const tvlValue = pipe(
            useProperty(store.fundData),
            E.map(({ tvlValue }) => tvlValue)
        );

        const texts = useProperty(i18n.WhatToBuy);

        return React.createElement(ChartLines, {
            tvlValue,
            texts: texts.Fund,
        });
    }
);
