import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newDepositEndPointViewModel } from './deposit-end-point.view-model';
import { DepositEndPoint } from './deposit-end-point.component';

export const DepositEndPointContainer = injectable(
    newDepositEndPointViewModel,
    // eslint-disable-next-line react/display-name
    (newDepositEndPointViewModel) => () => {
        const vm = useValueWithEffect(() => newDepositEndPointViewModel(), []);
        const details = useProperty(vm.details);
        return React.createElement(DepositEndPoint, { details });
    }
);
