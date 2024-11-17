import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newDepositEndPointViewModel } from './deposit-end-point.view-model';
import { DepositEndPoint } from './deposit-end-point.component';
import { useParams } from 'react-router-dom';

export const DepositEndPointContainer = injectable(
    newDepositEndPointViewModel,
    (newDepositEndPointViewModel) => () => {
        const { ticker } = useParams();

        const vm = useValueWithEffect(
            () => newDepositEndPointViewModel(ticker),
            []
        );
        const details = useProperty(vm.details);
        const coinLogo = useProperty(vm.img);
        return React.createElement(DepositEndPoint, { details, coinLogo });
    }
);
