import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { AddressForm } from './address-form.component';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';
import { I18NService } from '@/store/i18n/i18.store';

export const AddressFormContainer = injectable(
    token('withdrowStore')<WithdrowStore>(),
    token('i18n')<I18NService>(),

    (store, i18n) =>
        memo(() => {
            const ammount = useProperty(store.amount);
            const approximateCost = useProperty(store.approximateCost);
            const currency = useProperty(store.currency);
            const symbolLogo = useProperty(store.symbolLogo);

            const { Address: texts } = useProperty(i18n.Withdraw);

            return React.createElement(AddressForm, {
                ammount,
                approximateCost,
                currency,
                symbolLogo,
                setAddress: store.setAddress,
                setMemo: store.setMemo,
                texts,
            });
        })
);
