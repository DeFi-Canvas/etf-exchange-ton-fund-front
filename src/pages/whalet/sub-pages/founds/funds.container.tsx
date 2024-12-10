import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { injectable } from '@injectable-ts/core';
import React from 'react';
import { Funds } from './funds.page';
import { newFundsViewModel } from './funds.view-model';

export const FundsContainer = injectable(
    newFundsViewModel,
    (newFundsViewModel) => () => {
        const vm = useValueWithEffect(() => newFundsViewModel(), []);
        const funds = useProperty(vm.funds);

        return React.createElement(Funds, { funds });
    }
);
