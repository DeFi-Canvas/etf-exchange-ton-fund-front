import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { UserStoreService } from '@/store/user.store';
import { Funds } from './funds.component';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import { I18NService } from '@/store/i18n/i18.store';

export const FundsPageContainer = injectable(
    provide(Funds)<'purchaseStore'>(),
    token('userStore')<UserStoreService>(),
    (Funds, userStore) =>
        memo(() => {
            const store = newPurchaseSellStore({ userStore });
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(Funds({ purchaseStore }));
        })
);
