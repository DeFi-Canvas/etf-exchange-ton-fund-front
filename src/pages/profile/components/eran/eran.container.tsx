import { injectable } from '@injectable-ts/core';
import React from 'react';
import { newEranViewModel } from './eran.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { Eran } from './eran.component';

export const EranContainer = injectable(
    newEranViewModel,
    // eslint-disable-next-line react/display-name
    (newEranViewModel) => () => {
        const vm = useValueWithEffect(() => newEranViewModel(), []);
        const steps = useProperty(vm.steps);
        return React.createElement(Eran, { steps });
    }
);
