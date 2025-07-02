import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapFooter } from './swap-footer.component';
import { newSwapFooter } from './swap-footer.view-model';
import { useProperties } from '@frp-ts/react';

export const SwapFooterContainer = injectable(
    newSwapFooter,
    useValueWithEffect,
    (newSwapFooter, useValueWithEffect) => () => {
        const vm = useValueWithEffect(() => newSwapFooter(), []);

        const [isDisabled, btnText] = useProperties(vm.isDisabled, vm.btnText);
        return React.createElement(SwapFooter, { ...vm, isDisabled, btnText });
    }
);
