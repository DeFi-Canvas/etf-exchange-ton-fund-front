import { injectable, token } from '@injectable-ts/core';
import { WithdrowStore } from '../../withdrow.store';
import React, { memo } from 'react';
import { Address } from './address.component';

export const AddressContainer = injectable(
    token('withdrowStore')<WithdrowStore>(),
    Address,
    (store, Address) =>
        memo(() => {
            return React.createElement(Address);
        })
);
