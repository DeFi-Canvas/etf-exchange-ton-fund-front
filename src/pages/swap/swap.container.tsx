import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperties, useProperty } from '@frp-ts/react';
import { newSwipeStore } from './swap.store';
import { SwapPage } from './swap.page';

export const SwipePageContainer = injectable(
    newSwipeStore,
    provide(SwapPage)<'store'>(),
    (newSwipeStore, SwapPage) => () => {
        const store = useValueWithEffect(() => newSwipeStore(), []);
        const [swapAssets] = useProperties(store.swapAssets);
        return React.createElement(SwapPage({ store }), {
            ...store,
            swapAssets,
        });
    }
);
