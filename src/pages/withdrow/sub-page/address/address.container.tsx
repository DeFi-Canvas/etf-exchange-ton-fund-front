import {
    injectable,
    // provide,
    token,
} from '@injectable-ts/core';
import React, { memo } from 'react';
import { Address } from './address.component';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newNewWithdrowStore } from '../../withdrow.store';

// export const AddressContainer = injectable(Address, (Address) =>
//     memo(() => {
//         return React.createElement(Address);
//     })
// );

export const AddressContainer = injectable(
    token('userStore')<UserStoreService>(),
    // provide(Address)<'withdrowStore' | 'userStore'>(),
    (
        userStore
        // Address
    ) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                [userStore]
            );

            return React.createElement(
                Address({
                    withdrowStore,
                    // userStore,
                })
            );
        })
);
