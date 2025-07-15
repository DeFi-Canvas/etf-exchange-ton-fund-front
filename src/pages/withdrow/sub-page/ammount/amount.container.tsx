import { injectable, token } from '@injectable-ts/core';
import { newNewWithdrowStore, WithdrowStore } from '../../withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Amount } from './amount.component';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { I18NService } from '@/store/i18n/i18.store';

export const AmountContainer = injectable(
    useValueWithEffect,
    token('i18n')<I18NService>(),
    newNewWithdrowStore,
    // token('WithdrowStore')<WithdrowStore>(),
    (useValueWithEffect, i18n, newNewWithdrowStore) =>
        memo(() => {
            const { ticker } = useParams();
            const store = useValueWithEffect(() => newNewWithdrowStore(), []);
            store.setCurrency(ticker ?? 'TON');

            const { Amount: texts } = useProperty(i18n.Withdraw);

            const currency = useProperty(store.currency);
            const ammount = useProperty(store.amount);
            const approximateCost = useProperty(store.approximateCost);
            const isNextButtonAvailable = useProperty(
                store.isNextButtonAvailable
            );
            const updateAmmount = store.setAmount;
            const availableBalance = useProperty(store.availableBalance);
            const symbolLogo = useProperty(store.symbolLogo);
            console.log(currency);

            return React.createElement(Amount, {
                currency,
                amount: ammount,
                updateAmount: updateAmmount,
                approximateCost,
                isNextButtonAvailable,
                availableBalance,
                symbolLogo,
                texts,
            });
        })
);
