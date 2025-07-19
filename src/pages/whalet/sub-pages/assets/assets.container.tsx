import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { injectable } from '@injectable-ts/core';
import React, { memo } from 'react';
import { newAssetsViewModel } from './assets.view.model';
import { Assets } from './assets.page';

export const AssetsContainer = injectable(
    useValueWithEffect,
    newAssetsViewModel,
    (useValueWithEffect, newAssetsViewModel) =>
        memo(() => {
            const vm = useValueWithEffect(() => newAssetsViewModel(), []);
            const assets = useProperty(vm.assets);
            return React.createElement(Assets, { assets });
        })
);
