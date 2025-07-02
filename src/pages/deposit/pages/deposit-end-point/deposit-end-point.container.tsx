import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newDepositEndPointViewModel } from './deposit-end-point.view-model';
import { DepositEndPoint } from './deposit-end-point.component';
import { useParams } from 'react-router-dom';
import { I18NService } from '@/store/i18n/i18.store';

export const DepositEndPointContainer = injectable(
    newDepositEndPointViewModel,
    token('i18n')<I18NService>(),
    useValueWithEffect,
    (newDepositEndPointViewModel, i18n, useValueWithEffect) =>
        memo(() => {
            const { ticker } = useParams();

            const vm = useValueWithEffect(
                () => newDepositEndPointViewModel(ticker),
                []
            );
            const details = useProperty(vm.details);
            const coinLogo = useProperty(vm.img);
            const { EndPoint: texts } = useProperty(i18n.Deposit);
            return React.createElement(DepositEndPoint, {
                details,
                coinLogo,
                texts,
            });
        })
);
