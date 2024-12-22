import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../../purchase/purchase.store';
import { pipe } from 'fp-ts/lib/function';
import ChartLines from './lines.component';

export const ChartLinesContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const tvlValue = pipe(
            useProperty(store.fundData),
            E.map(({ tvlValue }) => tvlValue)
        );

        return React.createElement(ChartLines, {
            tvlValue,
        });
    }
);
