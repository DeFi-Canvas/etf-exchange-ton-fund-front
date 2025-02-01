import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapDropdown } from './swap-dropdown.component';
import { newSwapDropdown } from './swap-dropdown.view-model';
import { useProperties } from '@frp-ts/react';

export const SwapDropdownContainer = injectable(
    newSwapDropdown,
    (newSwapDropdown) => () => {
        const vm = useValueWithEffect(() => newSwapDropdown(), []);
        const [options] = useProperties(vm.options);
        return React.createElement(SwapDropdown, { options });
    }
);
