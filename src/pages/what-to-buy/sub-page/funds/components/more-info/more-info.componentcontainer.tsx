import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../../purchase/purchase.store';
import { pipe } from 'fp-ts/lib/function';
import MoreInfo, { ChartMoreInfoCardInterface } from './more-info.component';
import { I18NService } from '@/store/i18n/i18.store';

export const MoreInfoContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    token('i18n')<I18NService>(),

    (store, i18n) => () => {
        const fund = useProperty(store.fundData);
        const { Fund } = useProperty(i18n.WhatToBuy);
        const cards: Array<E.Either<string, ChartMoreInfoCardInterface>> = [
            E.right({
                id: 3,
                title: Fund.moreInfo.flow,
                value: '264',
            }),
            pipe(
                fund,
                E.map(({ createdAt }) => ({
                    id: 4,
                    title: Fund.moreInfo.created,
                    value: createdAt.split('T')[0],
                }))
            ),
        ];

        return React.createElement(MoreInfo, {
            cards,
            title: Fund.moreInfo.title,
        });
    }
);
