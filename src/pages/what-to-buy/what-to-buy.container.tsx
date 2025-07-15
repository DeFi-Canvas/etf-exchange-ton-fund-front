import { injectable, provide } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.store';

export const WhatToBuyPageContainer = injectable(
    useValueWithEffect,
    provide(WhatToBuyPage)<'purchaseStore'>(),
    newPurchaseSellStore,
    (useValueWithEffect, WhatToBuyPage, newPurchaseSellStore) =>
        memo(() => {
            const purchaseStore = useValueWithEffect(
                () => newPurchaseSellStore(),
                []
            );
            return React.createElement(WhatToBuyPage({ purchaseStore }));
        })
);
