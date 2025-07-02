import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { Address } from './address.component';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newNewWithdrowStore } from '../../withdrow.store';
import { I18NService } from '@/store/i18n/i18.store';

export const AddressContainer = injectable(
    token('userStore')<UserStoreService>(),
    token('i18n')<I18NService>(),
    (userStore, i18n) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                [userStore]
            );

            return React.createElement(
                Address({
                    withdrowStore,
                    i18n,
                })
            );
        })
);
