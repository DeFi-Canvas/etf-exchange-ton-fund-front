import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.store';
import { UserStoreService } from '@/store/user.store';
import { CaheStore } from '@/store/cache/cahe.store';

export const WhatToBuyPageContainer = injectable(
    provide(WhatToBuyPage)<'purchaseStore'>(),
    token('userStore')<UserStoreService>(),
    CaheStore,
    (WhatToBuyPage, userStore, caheStore) =>
        memo(() => {
            const store = newPurchaseSellStore({ userStore, caheStore });
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(WhatToBuyPage({ purchaseStore }));
        })
);
