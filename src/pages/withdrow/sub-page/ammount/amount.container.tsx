import { injectable, token } from '@injectable-ts/core';
import { WithdrowStore } from '../../withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Amount } from './amount.component';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { I18NService } from '@/store/i18n/i18.store';

export const AmountContainer = injectable(
    token('i18n')<I18NService>(),
    WithdrowStore,
    (i18n, store) =>
        memo(() => {
            const { ticker } = useParams();
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
