import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffectT } from '@/utils/run-view-model.utils';
import { SwapFooter } from './swap-footer.component';
import { newSwapFooter } from './swap-footer.view-model';
import { useProperties } from '@frp-ts/react';

export const SwapFooterContainer = injectable(
    useValueWithEffectT,
    newSwapFooter,
    (useValueWithEffect, newSwapFooter) => () => {
        const vm = useValueWithEffect(() => newSwapFooter(), []);

        const [isDisabled, btnText] = useProperties(vm.isDisabled, vm.btnText);
        return React.createElement(SwapFooter, { ...vm, isDisabled, btnText });
    }
);
