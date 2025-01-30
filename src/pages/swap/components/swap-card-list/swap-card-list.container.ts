import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newSwarCardList } from './swap-card-list.view-model';
import { SwapCardList, SwapCardListProps } from './swap-card-list.component';

interface SwarCardListContainer
    extends Omit<SwapCardListProps, 'swapButtonClick' | 'onAddAsset'> {}

export const SwarCardListContainer = injectable(
    newSwarCardList,
    SwapCardList,
    (newSwarCardList, SwapCardList) => (props: SwarCardListContainer) => {
        const vm = useValueWithEffect(() => newSwarCardList(), []);
        return React.createElement(SwapCardList, { ...props, ...vm });
    }
);
