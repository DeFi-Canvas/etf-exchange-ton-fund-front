import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { WithdrowStore } from '../../withdrow.store';
import { Final } from './final.component';

export const FinalContainer = injectable(
    token('withdrowStore')<WithdrowStore>(),
    (store) =>
        memo(() => {
            const currency = useProperty(store.currency);
            const amount = useProperty(store.amount);
            const address = useProperty(store.address);
            const onClick = store.clearData;

            return React.createElement(Final, {
                currency,
                amount,
                address,
                onClick,
            });
        })
);
