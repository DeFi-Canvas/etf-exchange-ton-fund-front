import { injectable } from '@injectable-ts/core';
import { useValueWithEffect } from '../../utils/run-view-model.utils';
import React from 'react';
import { newWhatToBuyViewModel } from './what-to-buy.view-model';
import { useProperty } from '@frp-ts/react';
import { WhatToBuyPage } from './what-to-buy.page';

export const WhatToBuyPageContainer = injectable(
    newWhatToBuyViewModel,
    // eslint-disable-next-line react/display-name
    (newWhatToBuyViewModel) => () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const vm = useValueWithEffect(() => newWhatToBuyViewModel(), []);
        const balance = useProperty(vm.balance);
        return React.createElement(WhatToBuyPage, { balance });
    }
);
