import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newAssetsViewModel } from './assets.view-model';
import { useProperty } from '@frp-ts/react';
import React from 'react';
import { Assets } from './assets.component';
import { injectable } from '@injectable-ts/core';

export const AssetsContainer = injectable(
    newAssetsViewModel,
    // eslint-disable-next-line react/display-name
    (newAssetsViewModel) => () => {
        const vm = useValueWithEffect(() => newAssetsViewModel(), []);
        const assets = useProperty(vm.assets);
        console.log(assets, 'assets');

        return React.createElement(Assets, { assets });
    }
);
