import { injectable, provide, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.view-model';
import { UserStoreService } from '@/store/user.store';

export const WhatToBuyPageContainer = injectable(
    provide(WhatToBuyPage)<'purchaseStore'>(),
    // newPurchaseSellStore,
    token('userStore')<UserStoreService>(),
    // (WhatToBuyPage, newPurchaseSellStore) => () => {
    (WhatToBuyPage, userStore) => () => {
        const store = newPurchaseSellStore({ userStore });
        const purchaseStore = useValueWithEffect(() => store(), [store]);
        const WhatToBuyPageResolve = WhatToBuyPage({
            purchaseStore,
        });
        return React.createElement(WhatToBuyPageResolve);
    }
);
