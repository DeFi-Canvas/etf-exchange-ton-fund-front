import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { newEranViewModel } from './earn.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { Earn } from './earn.component';
import { I18NService } from '@/store/i18n/i18.store';

export const EarnContainer = injectable(
    newEranViewModel,
    token('i18n')<I18NService>(),

    (newEranViewModel, i18n) => () => {
        const vm = useValueWithEffect(() => newEranViewModel(), []);
        const steps = useProperty(vm.steps);
        const i18nText = useProperty(i18n.Profile);

        return React.createElement(Earn, {
            steps,
            checkStep: vm.checkStep,
            i18nText,
        });
    }
);
