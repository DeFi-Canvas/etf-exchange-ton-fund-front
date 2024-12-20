import { injectable } from '@injectable-ts/core';
import { newWhatToBuyViewModel } from '../../whalet.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { Balans } from './balans.component';

export const BalanceContainer = injectable(
    newWhatToBuyViewModel,
    (newWhatToBuyViewModel) => () => {
        const vm = useValueWithEffect(() => newWhatToBuyViewModel(), []);
        const balance = useProperty(vm.balance);
        return React.createElement(Balans, { balance });
    }
);
