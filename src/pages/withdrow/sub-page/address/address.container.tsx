import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { Address } from './address.component';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newNewWithdrowStore } from '../../withdrow.store';

export const AddressContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                [userStore]
            );

            return React.createElement(
                Address({
                    withdrowStore,
                })
            );
        })
);
