import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { newNewWithdrowStore } from '../../withdrow.store';
import { Final } from './final.component';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const FinalContainer = injectable(
    token('userStore')<UserStoreService>(),
    // token('withdrowStore')<WithdrowStore>(),
    (userStore) =>
        memo(() => {
            const store = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                []
            );
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
