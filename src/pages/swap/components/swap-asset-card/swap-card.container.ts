import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newSwarCard } from './swap-card.view-model';
import { SwapAssetCard, SwapAssetCardProps } from './swap-asset-card.component';

interface SwarCardListContainer
    extends Omit<
        SwapAssetCardProps,
        'onArrowClick' | 'onChangeField' | 'onMaxClick'
    > {}

export const SwapAssetCardContainer = injectable(
    newSwarCard,
    (newSwarCard) => (props: SwarCardListContainer) => {
        const vm = useValueWithEffect(() => newSwarCard(), []);
        return React.createElement(SwapAssetCard, { ...props, ...vm });
    }
);
