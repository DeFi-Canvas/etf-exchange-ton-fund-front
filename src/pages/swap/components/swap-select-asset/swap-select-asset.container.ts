import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import {
    SwapSelectAsset,
    SwapSelectAssetProps,
} from './swap-select-asset.component';
import { newSwapSelectAsset } from './swap-select-asset.view-model';
import { useProperties, useProperty } from '@frp-ts/react';
import { I18NService } from '@/store/i18n/i18.store';

interface SwarCardListContainer
    extends Omit<
        SwapSelectAssetProps,
        | 'avlailibleAssets'
        | 'isOpen'
        | 'onSelectAsset'
        | 'closeBottomSheet'
        | 'onSearchAssets'
        | 'title'
    > {}

export const SwapSelectAssetContainer = injectable(
    useValueWithEffect,
    newSwapSelectAsset,
    token('i18n')<I18NService>(),
    (useValueWithEffect, newSwapSelectAsset, i18n) =>
        (props: SwarCardListContainer) => {
            const vm = useValueWithEffect(() => newSwapSelectAsset(), []);
            const [avlailibleAssets, isOpen] = useProperties(
                vm.avlailibleAssets,
                vm.isOpen
            );

            const { select: title } = useProperty(i18n.Swap);

            return React.createElement(SwapSelectAsset, {
                ...props,
                ...vm,
                avlailibleAssets,
                isOpen,
                title,
            });
        }
);
