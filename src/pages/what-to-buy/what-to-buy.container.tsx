import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.store';
import { UserStoreService } from '@/store/user.store';

export const WhatToBuyPageContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) => () => {
        const store = newPurchaseSellStore({ userStore });
        const purchaseStore = useValueWithEffect(() => store(), []);
        return React.createElement(WhatToBuyPage({ purchaseStore }));
    }
);
