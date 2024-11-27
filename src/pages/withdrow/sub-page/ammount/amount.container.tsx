import { injectable, token } from '@injectable-ts/core';
import { newNewWithdrowStore } from '../../withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Amount } from './amount.component';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const AmountContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) =>
        memo(() => {
            const { ticker } = useParams();
            const store = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                []
            );
            store.setCurrency(ticker ?? '');

            const currency = useProperty(store.currency);
            const ammount = useProperty(store.amount);
            const approximateCost = useProperty(store.approximateCost);
            const isNextButtonAvailable = useProperty(
                store.isNextButtonAvailable
            );
            const updateAmmount = store.setAmount;
            const availableBalance = useProperty(store.availableBalance);
            const symbolLogo = useProperty(store.symbolLogo);

            return React.createElement(Amount, {
                currency,
                amount: ammount,
                updateAmount: updateAmmount,
                approximateCost,
                isNextButtonAvailable,
                availableBalance,
                symbolLogo,
            });
        })
);
