import { injectable, provide, token } from '@injectable-ts/core';
import { newNewWithdrowStore } from '../../withdrow.store';
import React, { memo } from 'react';
import { Address } from './address.component';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const AddressContainer = injectable(
    provide(Address)<'withdrowStore'>(),
    token('userStore')<UserStoreService>(),
    (Address, userStore) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                []
            );
            const AddressResolve = Address({ withdrowStore });
            return React.createElement(AddressResolve);
        })
);
