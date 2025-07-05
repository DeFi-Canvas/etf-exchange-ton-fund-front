import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import {
    useValueWithEffect,
    useValueWithEffectT,
} from '@/utils/run-view-model.utils';
import { SwapDropdown } from './swap-dropdown.component';
import { newSwapDropdown } from './swap-dropdown.view-model';
import { useProperties, useProperty } from '@frp-ts/react';
import { I18NService } from '@/store/i18n/i18.store';

export const SwapDropdownContainer = injectable(
    useValueWithEffectT,
    newSwapDropdown,
    token('i18n')<I18NService>(),
    (useValueWithEffect, newSwapDropdown, i18n) => () => {
        const vm = useValueWithEffect(() => newSwapDropdown(), []);
        const [options] = useProperties(vm.options);
        const { details: texts } = useProperty(i18n.Swap);
        return React.createElement(SwapDropdown, {
            options,
            title: texts.title,
        });
    }
);
