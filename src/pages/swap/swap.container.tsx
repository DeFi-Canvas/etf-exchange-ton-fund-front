import { injectable, provide } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';

export const SwapPageContainer = injectable(
    useValueWithEffect,
    provide(SwapPage)<'store'>(),
    newSwapStore,
    (useValueWithEffect, SwapPage, newSwapStore) =>
        memo(() => {
            const store = useValueWithEffect(() => newSwapStore(), []);

            const [swapAssets] = useProperties(store.swapAssets);

            return React.createElement(
                SwapPage({
                    store,
                }),
                {
                    ...store,
                    swapAssets,
                }
            );
        })
);
