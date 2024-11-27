import { injectable, provide, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.view-model';
import { UserStoreService } from '@/store/user.store';

export const WhatToBuyPageContainer = injectable(
    provide(WhatToBuyPage)<'purchaseStore'>(),
    token('userStore')<UserStoreService>(),

    // newPurchaseSellStore,
    (
            WhatToBuyPage,
            userStore
            // newPurchaseViewModel
        ) =>
        () => {
            const purchaseStore = useValueWithEffect(
                () => newPurchaseSellStore({ userStore })(),
                []
            );

            const WhatToBuyPageResolve = WhatToBuyPage({
                purchaseStore,
            });
            return React.createElement(WhatToBuyPageResolve, {});
        }
);
