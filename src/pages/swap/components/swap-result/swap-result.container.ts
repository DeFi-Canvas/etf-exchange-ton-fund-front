import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapResult } from './swap-result.component';
import { newSwapResult } from './swap-result.view-model';
import { useProperties } from '@frp-ts/react';

export const SwapResultContainer = injectable(
    newSwapResult,
    useValueWithEffect,
    (newSwapResult, useValueWithEffect) => () => {
        const vm = useValueWithEffect(() => newSwapResult(), []);
        const [isOpen, status, subTitle, logos, resultOptions] = useProperties(
            vm.isOpen,
            vm.status,
            vm.subTitle,
            vm.logos,
            vm.resultOptions
        );
        return React.createElement(SwapResult, {
            ...vm,
            isOpen,
            status,
            subTitle,
            logos,
            resultOptions,
        });
    }
);
