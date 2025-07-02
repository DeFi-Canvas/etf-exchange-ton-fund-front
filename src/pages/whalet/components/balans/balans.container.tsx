import { injectable, token } from '@injectable-ts/core';
import { newWhatToBuyViewModel } from '../../wallet.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { Balans } from './balans.component';
import { I18NService } from '@/store/i18n/i18.store';

export const BalanceContainer = injectable(
    newWhatToBuyViewModel,
    token('i18n')<I18NService>(),
    useValueWithEffect,
    (newWhatToBuyViewModel, i18n, useValueWithEffect) => () => {
        const vm = useValueWithEffect(() => newWhatToBuyViewModel(), []);
        const balance = useProperty(vm.balance);
        const texts = useProperty(i18n.Wallet);
        return React.createElement(Balans, { balance, texts });
    }
);
