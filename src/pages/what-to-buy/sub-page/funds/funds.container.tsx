import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { UserStoreService } from '@/store/user.store';
import { Funds } from './funds.component';
import { newPurchaseSellStore } from '../purchase/purchase.view-model';

export const FundsPageContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) => () => {
        const store = newPurchaseSellStore({ userStore });
        const purchaseStore = useValueWithEffect(() => store(), []);
        return React.createElement(Funds({ purchaseStore }));
    }
);
