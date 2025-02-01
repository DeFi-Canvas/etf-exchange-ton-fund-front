import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newSwapHeader } from './swap-header.view-model';
import { SwapHeader } from './swap-header.component';

export const SwapHeaderContainer = injectable(
    newSwapHeader,
    (newSwapHeader) => () => {
        const vm = useValueWithEffect(() => newSwapHeader(), []);
        return React.createElement(SwapHeader, { ...vm });
    }
);
