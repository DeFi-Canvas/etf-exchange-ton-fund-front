import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { AddressForm } from './address-form.component';
import { WithdrowService } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';

export const AddressFormContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    (store) =>
        memo(() => {
            const ammount = useProperty(store.ammount);
            const approximateCost = useProperty(store.approximateCost);
            const currency = useProperty(store.currency);

            return React.createElement(AddressForm, {
                ammount,
                approximateCost,
                currency,
            });
        })
);
