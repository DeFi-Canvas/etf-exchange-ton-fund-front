import { injectable } from '@injectable-ts/core';
import React, { memo } from 'react';
import { Address } from './address.component';

export const AddressContainer = injectable(Address, (Address) =>
    memo(() => {
        return React.createElement(Address);
    })
);
