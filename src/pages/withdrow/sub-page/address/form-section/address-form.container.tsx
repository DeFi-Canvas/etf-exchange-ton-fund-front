import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { AddressForm } from './address-form.component';
import { WithdrowService } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';

export const AddressFormContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    (store) =>
        memo(() => {
            const ammount = useProperty(store.amount);
            const approximateCost = useProperty(store.approximateCost);
            const currency = useProperty(store.currency);
            const address = useProperty(store.address);
            const memo = useProperty(store.memo);
            const symbolLogo = useProperty(store.symbolLogo);

            return React.createElement(AddressForm, {
                ammount,
                approximateCost,
                currency,
                address,
                memo,
                symbolLogo,
                setAddress: store.setAddress,
                setMemo: store.setMemo,
            });
        })
);
