import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { WithdrowStore } from '../../withdrow.store';
import { Final } from './final.component';
import { I18NService } from '@/store/i18n/i18.store';

export const FinalContainer = injectable(
    token('i18n')<I18NService>(),
    WithdrowStore,

    (i18n, store) =>
        memo(() => {
            const currency = useProperty(store.currency);
            const amount = useProperty(store.amount);
            const address = useProperty(store.address);
            const onClick = store.clearData;

            const { Final: texts } = useProperty(i18n.Withdraw);

            return React.createElement(Final, {
                currency,
                amount,
                address,
                onClick,
                texts,
            });
        })
);
