import { injectable, token } from '@injectable-ts/core';
import { WithdrowService } from '../../withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Amount } from './amount.component';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

export const AmountContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    (store) =>
        memo(() => {
            const { ticker } = useParams();
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
