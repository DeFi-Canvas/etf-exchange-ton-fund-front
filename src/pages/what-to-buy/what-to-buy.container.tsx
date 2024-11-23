import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.view-model';

export const WhatToBuyPageContainer = injectable(
    provide(WhatToBuyPage)<'purchaseStore'>(),
    newPurchaseSellStore,
    (WhatToBuyPage, newPurchaseViewModel) => () => {
        const purchaseStore = useValueWithEffect(
            () => newPurchaseViewModel(),
            []
        );

        const WhatToBuyPageResolve = WhatToBuyPage({
            purchaseStore,
        });
        return React.createElement(WhatToBuyPageResolve, {});
    }
);
