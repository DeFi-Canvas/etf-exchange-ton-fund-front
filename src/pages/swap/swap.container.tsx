import { injectable, token } from '@injectable-ts/core';
import React, { useMemo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';
import { UserStoreService } from '@/store/user.store';
import { newSwapRestService } from '@/API/swipe.service';

export const SwapPageContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) => () => {
        const store = useValueWithEffect(
            () => newSwapStore({ userStore })(),
            []
        );

        const swapService = useMemo(
            () =>
                newSwapRestService({
                    userStore,
                }),
            [userStore]
        );

        const [swapAssets] = useProperties(store.swapAssets);

        return React.createElement(
            SwapPage({
                store,
                userStore,
                swapService,
            }),
            {
                ...store,
                swapAssets,
            }
        );
    }
);
