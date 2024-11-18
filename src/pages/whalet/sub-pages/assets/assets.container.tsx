import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { injectable } from '@injectable-ts/core';
import React from 'react';
import { newAssetsViewModel } from './assets.view.model';
import { Assets } from './assets.page';

export const AssetsContainer = injectable(
    newAssetsViewModel,
    (newAssetsViewModel) => () => {
        const vm = useValueWithEffect(() => newAssetsViewModel(), []);
        const assets = useProperty(vm.assets);
        return React.createElement(Assets, { assets });
    }
);
