import { injectable, provide } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { Funds } from './funds.component';
import { newPurchaseSellStore } from '../purchase/purchase.store';

export const FundsPageContainer = injectable(
    useValueWithEffect,
    provide(Funds)<'purchaseStore'>(),
    newPurchaseSellStore,
    (useValueWithEffect, Funds, store) =>
        memo(() => {
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(Funds({ purchaseStore }));
        })
);
