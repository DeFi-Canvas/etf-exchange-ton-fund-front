import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties, useProperty } from '@frp-ts/react';
import { newSwapStore } from './swap.store';
import { SwapPage } from './swap.page';

export const SwapPageContainer = injectable(
    newSwapStore,
    provide(SwapPage)<'store'>(),
    (newSwapStore, SwapPage) => () => {
        const store = useValueWithEffect(() => newSwapStore(), []);
        const [swapAssets] = useProperties(store.swapAssets);
        return React.createElement(SwapPage({ store }), {
            ...store,
            swapAssets,
        });
    }
);
