import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import About from './about.component';
import { PurchaseSellStore } from '../../../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';
import { FundsData } from '@/pages/whalet/whalet.model';

export const AboutContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const fund = pipe(
            useProperty(store.fundData),
            E.getOrElse(() => ({} as FundsData))
        );

        return React.createElement(About, {
            description: fund.description,
            fee: fund.managementFee,
        });
    }
);
