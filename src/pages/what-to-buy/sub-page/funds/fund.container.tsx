import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { FundPage } from './fund.page';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import { useProperty } from '@frp-ts/react';
import { useParams } from 'react-router-dom';
import { I18NService } from '@/store/i18n/i18.store';

export const FundPageContainer = injectable(
    provide(FundPage)<'purchaseStore'>(),
    newPurchaseSellStore,
    useValueWithEffect,
    (FundPage, newPurchaseViewModel, useValueWithEffect) =>
        memo(() => {
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
        })
);
