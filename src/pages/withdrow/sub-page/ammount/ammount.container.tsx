import { injectable, token } from '@injectable-ts/core';
import { WithdrowService } from '../../withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Ammount } from './ammount.component';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

export const AmmountContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    (store) =>
        memo(() => {
            const { ticker } = useParams();
            store.setCurrency(ticker ?? '');

            const currency = useProperty(store.currency);
            const ammount = useProperty(store.ammount);
            const approximateCost = useProperty(store.approximateCost);
            const isNextButtonAvailable = useProperty(
                store.isNextButtonAvailable
            );
            const updateAmmount = store.setAmmount;

            return React.createElement(Ammount, {
                currency,
                ammount,
                updateAmmount,
                approximateCost,
                isNextButtonAvailable,
            });
        })
);
