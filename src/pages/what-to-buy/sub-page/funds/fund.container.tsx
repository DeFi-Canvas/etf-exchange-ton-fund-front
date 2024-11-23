import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { FundPage } from './fund.page';
import { newPurchaseSellStore } from '../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';
import { useProperty } from '@frp-ts/react';
import * as E from 'fp-ts/Either';
import { useParams } from 'react-router-dom';
import { FundsData } from '@/pages/whalet/whalet.model';

export const FundPageContainer = injectable(
    provide(FundPage)<'purchaseStore'>(),
    newPurchaseSellStore,
    (FundPage, newPurchaseViewModel) => () => {
        const { id } = useParams();

        const purchaseStore = useValueWithEffect(
            () => newPurchaseViewModel(id),
            []
        );

        const fund = pipe(
            useProperty(purchaseStore.fundData),
            E.getOrElse(() => ({} as FundsData))
        );

        const FundPageResolve = FundPage({
            purchaseStore,
        });
        return React.createElement(FundPageResolve, {
            name: fund.name,
            logo: fund.logo,
        });
    }
);
