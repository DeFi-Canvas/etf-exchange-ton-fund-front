import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { Address } from './address.component';
import { WithdrowStore } from '../../withdrow.store';
import { I18NService } from '@/store/i18n/i18.store';

export const AddressContainer = injectable(
    token('i18n')<I18NService>(),
    WithdrowStore,
    (i18n, withdrowStore) =>
        memo(() => {
            return React.createElement(
                Address({
                    withdrowStore,
                    i18n,
                })
            );
        })
);
