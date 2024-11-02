import { injectable } from '@injectable-ts/core';
import React from 'react';
import { newEranViewModel } from './earn.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { Earn } from './earn.component';

export const EarnContainer = injectable(
    newEranViewModel,
    // eslint-disable-next-line react/display-name
    (newEranViewModel) => () => {
        const vm = useValueWithEffect(() => newEranViewModel(), []);
        const steps = useProperty(vm.steps);
        return React.createElement(Earn, { steps });
    }
);
