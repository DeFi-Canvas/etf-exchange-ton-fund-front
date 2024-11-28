import {
    injectable,
    // provide,
    token,
} from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { WhatToBuyPage } from './what-to-buy.component';
import { newPurchaseSellStore } from './sub-page/purchase/purchase.view-model';
import { UserStoreService } from '@/store/user.store';

// export const WhatToBuyPageContainer = injectable(
//     provide(WhatToBuyPage)<'purchaseStore'>(),
//     newPurchaseSellStore,
//     (WhatToBuyPage, newPurchaseSellStore) => () => {
//         const purchaseStore = useValueWithEffect(
//             () => newPurchaseSellStore(),
//             []
//         );

//         const WhatToBuyPageResolve = WhatToBuyPage({
//             purchaseStore,
//         });
//         return React.createElement(WhatToBuyPageResolve);
//     }
// );

export const WhatToBuyPageContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) => () => {
        const store = newPurchaseSellStore({ userStore });
        const purchaseStore = useValueWithEffect(() => store(), []);
        return React.createElement(WhatToBuyPage({ purchaseStore }));
    }
);

// const WhatToBuyPage = () => {
//     return (
//         <div>
//             WhatToBuyPage
//             <input type="text" />
//             <SerchInput placeholder={'Search'} />
//         </div>
//     );
// };
