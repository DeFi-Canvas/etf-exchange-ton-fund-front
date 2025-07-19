import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newSwapHeader } from './swap-header.view-model';
import { SwapHeader } from './swap-header.component';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

export const SwapHeaderContainer = injectable(
    useValueWithEffect,
    newSwapHeader,
    token('i18n')<I18NService>(),
    (useValueWithEffect, newSwapHeader, i18n) => () => {
        const vm = useValueWithEffect(() => newSwapHeader(), []);
        const { header: texts } = useProperty(i18n.Swap);
        return React.createElement(SwapHeader, { ...vm, texts });
    }
);
