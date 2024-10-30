import { injectable } from '@injectable-ts/core';
import { newWhatToBuyViewModel } from '../../what-to-buy.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { Balans } from './balans.component';

export const BalanceContainer = injectable(
    newWhatToBuyViewModel,
    // eslint-disable-next-line react/display-name
    (newWhatToBuyViewModel) => () => {
        const vm = useValueWithEffect(() => newWhatToBuyViewModel(), []);
        const balance = useProperty(vm.balance);
        return React.createElement(Balans, { balance });
    }
);
