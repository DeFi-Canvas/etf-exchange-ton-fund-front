import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import {
    SwapSelectAsset,
    SwapSelectAssetProps,
} from './swap-select-asset.component';
import { newSwapSelectAsset } from './swap-select-asset..view-model';
import { useProperties } from '@frp-ts/react';

interface SwarCardListContainer
    extends Omit<
        SwapSelectAssetProps,
        'avlailibleAssets' | 'isOpen' | 'onSelectAsset' | 'closeBottomSheet'
    > {}

export const SwapSelectAssetContainer = injectable(
    newSwapSelectAsset,
    (newSwapSelectAsset) => (props: SwarCardListContainer) => {
        const vm = useValueWithEffect(() => newSwapSelectAsset(), []);
        const [avlailibleAssets, isOpen] = useProperties(
            vm.avlailibleAssets,
            vm.isOpen
        );
        return React.createElement(SwapSelectAsset, {
            ...props,
            ...vm,
            avlailibleAssets,
            isOpen,
        });
    }
);
