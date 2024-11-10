import { injectable, token } from '@injectable-ts/core';
import { WithdrowService } from '../../withdrow.store';
import React, { memo } from 'react';
import { Address } from './address.component';

export const AddressContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    Address,
    (store, Address) =>
        memo(() => {
            return React.createElement(Address);
        })
);
