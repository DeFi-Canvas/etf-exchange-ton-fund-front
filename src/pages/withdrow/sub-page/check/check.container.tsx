import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { WithdrowService } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Check } from './check.component';

export const CheckContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    Check,
    (store, Check) =>
        memo(() => {
            const ammount = useProperty(store.amount);
            const approximateCost = useProperty(store.approximateCost);
            const currency = useProperty(store.currency);
            const address = useProperty(store.address);
            const memo = useProperty(store.memo);
            const symbolLogo = useProperty(store.symbolLogo);

            return React.createElement(Check, {
                ammount,
                approximateCost,
                currency,
                address,
                memo,
                symbolLogo,
            });
        })
);
