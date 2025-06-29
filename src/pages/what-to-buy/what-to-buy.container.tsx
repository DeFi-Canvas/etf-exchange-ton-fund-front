import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.store';
import { UserStoreService } from '@/store/user.store';

export const WhatToBuyPageContainer = injectable(
    provide(WhatToBuyPage)<'purchaseStore'>(),
    token('userStore')<UserStoreService>(),
    (WhatToBuyPage, userStore) =>
        memo(() => {
            const store = newPurchaseSellStore({ userStore });
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(WhatToBuyPage({ purchaseStore }));
        })
);
