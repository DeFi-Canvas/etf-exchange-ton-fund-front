import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { Address } from './address.component';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newNewWithdrowStore } from '../../withdrow.store';
import { I18NService } from '@/store/i18n/i18.store';

export const AddressContainer = injectable(
    useValueWithEffect,
    token('i18n')<I18NService>(),
    newNewWithdrowStore,
    (useValueWithEffect, i18n, newNewWithdrowStore) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore(),
                []
            );

            return React.createElement(
                Address({
                    withdrowStore,
                    i18n,
                })
            );
        })
);
