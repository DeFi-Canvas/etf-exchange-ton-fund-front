import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { newNewWithdrowStore } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';
import { Check } from './check.component';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const CheckContainer = injectable(
    token('userStore')<UserStoreService>(),
    provide(Check)<'withdrowStore'>(),
    (userStore, Check) =>
        memo(() => {
            const store = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                []
            );

            const CheckResolved = Check({ withdrowStore: store });
            const ammount = useProperty(store.amount);
            const approximateCost = useProperty(store.approximateCost);
            const currency = useProperty(store.currency);
            const address = useProperty(store.address);
            const memo = useProperty(store.memo);
            const symbolLogo = useProperty(store.symbolLogo);

            return React.createElement(CheckResolved, {
                ammount,
                approximateCost,
                currency,
                address,
                memo,
                symbolLogo,
            });
        })
);
