import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { UserStoreService } from '@/store/user.store';
import { Funds } from './funds.component';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import { CacheStore } from '@/store/cache/cahe.store';

export const FundsPageContainer = injectable(
    provide(Funds)<'purchaseStore'>(),
    token('userStore')<UserStoreService>(),
    CacheStore,
    (Funds, userStore, cacheStore) =>
        memo(() => {
            const store = newPurchaseSellStore({ userStore, cacheStore });
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(Funds({ purchaseStore }));
        })
);
