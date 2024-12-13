import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';
import MoreInfo, { ChartMoreInfoCardInterface } from './more-info.component';

export const MoreInfoContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const fund = pipe(useProperty(store.fundData));
        const cards: Array<E.Either<string, ChartMoreInfoCardInterface>> = [
            E.right({
                id: 3,
                title: 'People follow',
                value: '264',
            }),
            pipe(
                fund,
                E.map(({ createdAt }) => ({
                    id: 4,
                    title: 'Created at',
                    value: createdAt,
                }))
            ),
        ];

        return React.createElement(MoreInfo, {
            cards,
        });
    }
);
