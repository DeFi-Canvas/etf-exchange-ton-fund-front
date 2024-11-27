import { injectable } from '@injectable-ts/core';
// import { newNewWithdrowStore } from '../../withdrow.store';
import React, { memo } from 'react';
import { Address } from './address.component';
// import { UserStoreService } from '@/store/user.store';
// import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const AddressContainer = injectable(
    // provide(Address)<'withdrowStore'>(),
    Address,
    // token('userStore')<UserStoreService>(),
    (Address) =>
        memo(() => {
            // const withdrowStore = useValueWithEffect(
            //     () => newNewWithdrowStore({ userStore }),
            //     []
            // );
            // const AddressResolve = Address({ withdrowStore });
            return React.createElement(Address);
        })
);
