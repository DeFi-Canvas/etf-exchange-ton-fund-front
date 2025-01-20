import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newSwipeStore } from './swap.store';
import { SwapPage } from './swap.page';

export const SwipePageContainer = injectable(
    newSwipeStore,
    (newSwipeStore) => () => {
        const store = useValueWithEffect(() => newSwipeStore(), []);
        return React.createElement(SwapPage, { ...store });
    }
);
