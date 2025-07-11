import { injectable } from '@injectable-ts/core';
import React from 'react';
import {
    useValueWithEffect,
    useValueWithEffectT,
} from '@/utils/run-view-model.utils';
import { newSwapCardList } from './swap-card-list.view-model';
import { SwapCardList, SwapCardListProps } from './swap-card-list.component';

interface SwapCardListContainer
    extends Omit<
        SwapCardListProps,
        'swapButtonClick' | 'onAddAsset' | 'onDelete'
    > {}

export const SwapCardListContainer = injectable(
    useValueWithEffectT,
    newSwapCardList,
    SwapCardList,
    (useValueWithEffect, newSwapCardList, SwapCardList) =>
        (props: SwapCardListContainer) => {
            const vm = useValueWithEffect(() => newSwapCardList(), []);
            return React.createElement(SwapCardList, { ...props, ...vm });
        }
);
