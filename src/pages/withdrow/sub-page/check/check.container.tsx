import { injectable, provide } from '@injectable-ts/core';
import React, { memo } from 'react';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Check } from './check.component';

export const CheckContainer = injectable(
    provide(Check)<'withdrowStore'>(),
    WithdrowStore,
    (Check, store) =>
        memo(() => {
            const CheckResolved = Check({ withdrowStore: store });
            const ammount = useProperty(store.amount);
            const approximateCost = useProperty(store.approximateCost);
            const currency = useProperty(store.currency);
            const address = useProperty(store.address);
            const symbolLogo = useProperty(store.symbolLogo);

            return React.createElement(CheckResolved, {
                ammount,
                approximateCost,
                currency,
                address,
                symbolLogo,
            });
        })
);
