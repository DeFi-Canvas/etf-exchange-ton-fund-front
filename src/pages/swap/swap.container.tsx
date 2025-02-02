import { injectable, provide, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties, useProperty } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';
// import { UserStoreService } from '@/store/user.store';

export const SwapPageContainer = injectable(
    newSwapStore,
    (newSwapStore) => () => {
        const store = useValueWithEffect(() => newSwapStore(), []);
        const [swapAssets] = useProperties(store.swapAssets);
        return React.createElement(SwapPage({ store }), {
            ...store,
            swapAssets,
        });
    }
);

//TODO: Разкоментировать если инпут не починится
// export const SwapPageContainer = injectable(
//     token('userStore')<UserStoreService>(),
//     (userStore) => () => {
//         const store = useValueWithEffect(
//             () => newSwapStore({ userStore })(),
//             []
//         );
//         const [swapAssets] = useProperties(store.swapAssets);
//         return React.createElement(SwapPage({ store }), {
//             ...store,
//             swapAssets,
//         });
//     }
// );
