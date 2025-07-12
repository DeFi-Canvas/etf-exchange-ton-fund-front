import { injectable, provide } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { Funds } from './funds.component';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import { CacheStore } from '@/store/cache/cahe.store';

export const FundsPageContainer = injectable(
    useValueWithEffect,
    provide(Funds)<'purchaseStore'>(),
    CacheStore,
    (useValueWithEffect, Funds, cacheStore) =>
        memo(() => {
            const store = newPurchaseSellStore({
                cacheStore,
            });
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(Funds({ purchaseStore }));
        })
);
