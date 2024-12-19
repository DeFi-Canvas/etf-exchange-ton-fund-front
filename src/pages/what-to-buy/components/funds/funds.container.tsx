import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React, { memo } from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../sub-page/purchase/purchase.store';
import { FondCardProps } from '@/components/fond-card/fond-card.component';
import { useNavigate } from 'react-router-dom';
import { pipe } from 'fp-ts/lib/function';
import { FondsWrap } from './funds.component';

export const FondsWrapContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) =>
        memo(() => {
            const fundsData = useProperty(store.funds);
            //TODO: создать вм и перенести туда
            const funds: E.Either<
                string,
                Array<Omit<FondCardProps, 'onClick'>>
            > = pipe(
                fundsData,
                E.map((e) =>
                    e.map((e) => ({
                        id: e.id,
                        title: e.name,
                        description: e.description,
                    }))
                )
            );

            const navigate = useNavigate();

            return React.createElement(FondsWrap, {
                funds,
                onClick: (id) => {
                    navigate(`/what-to-buy/fund/${id}`);
                },
            });
        })
);
