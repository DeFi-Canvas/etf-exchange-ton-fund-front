import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { UserStoreService } from '@/store/user.store';
import { Funds } from './funds.component';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import { I18NService } from '@/store/i18n/i18.store';
import { CaheStore } from '@/store/cache/cahe.store';

export const FundsPageContainer = injectable(
    provide(Funds)<'purchaseStore'>(),
    token('userStore')<UserStoreService>(),
    CaheStore,
    (Funds, userStore, caheStore) =>
        memo(() => {
            const store = newPurchaseSellStore({ userStore, caheStore });
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(Funds({ purchaseStore }));
        })
);
