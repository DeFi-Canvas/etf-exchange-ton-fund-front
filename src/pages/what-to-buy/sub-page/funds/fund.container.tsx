import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { FundPage } from './fund.page';
import { newPurchaseSellStore } from '../purchase/purchase.view-model';
import { useProperty } from '@frp-ts/react';
import { useParams } from 'react-router-dom';

export const FundPageContainer = injectable(
    provide(FundPage)<'purchaseStore'>(),
    newPurchaseSellStore,
    (FundPage, newPurchaseViewModel) => () => {
        const { id } = useParams();

        const purchaseStore = useValueWithEffect(
            () => newPurchaseViewModel(id),
            []
        );

        const fund = useProperty(purchaseStore.fundData);
        const FundPageResolve = FundPage({
            purchaseStore,
        });
        return React.createElement(FundPageResolve, {
            fund,
        });
    }
);
