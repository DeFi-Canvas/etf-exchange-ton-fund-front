import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.store';
import { CacheStore } from '@/store/cache/cahe.store';

export const WhatToBuyPageContainer = injectable(
    useValueWithEffect,
    provide(WhatToBuyPage)<'purchaseStore'>(),
    CacheStore,
    (useValueWithEffect, WhatToBuyPage, cacheStore) =>
        memo(() => {
            const store = newPurchaseSellStore({
                cacheStore,
            });
            const purchaseStore = useValueWithEffect(() => store(), []);
            return React.createElement(WhatToBuyPage({ purchaseStore }));
        })
);
