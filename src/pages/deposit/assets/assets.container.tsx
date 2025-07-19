import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { AssetsViewModelInit, newAssetsViewModel } from './assets.view-model';
import { useProperty } from '@frp-ts/react';
import React from 'react';
import { Assets } from './assets.component';
import { injectable } from '@injectable-ts/core';

interface AssetsContainerProps {
    type: AssetsViewModelInit;
    onClick?: () => void;
}

export const AssetsContainer = injectable(
    useValueWithEffect,
    newAssetsViewModel,
    (useValueWithEffect, newAssetsViewModel) =>
        ({ type, onClick }: AssetsContainerProps) => {
            const vm = useValueWithEffect(
                () => newAssetsViewModel(type),
                [type]
            );
            const assets = useProperty(vm.assets);

            const handleClick = vm.handleClick;
            return React.createElement(Assets, {
                assets,
                type,
                handleClick: (asset) => {
                    onClick && onClick();
                    handleClick(asset);
                },
            });
        }
);
