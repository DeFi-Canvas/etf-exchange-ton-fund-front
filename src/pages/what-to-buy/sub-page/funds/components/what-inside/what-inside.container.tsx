import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';
import WhatInside from './what-inside.component';
import { FundsData } from '@/pages/whalet/whalet.model';

export const WhatInsideContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const fund = pipe(
            useProperty(store.fundData),
            E.getOrElse(() => ({} as FundsData))
        );

        return React.createElement(WhatInside, {
            assets: fund,
        });
    }
);
