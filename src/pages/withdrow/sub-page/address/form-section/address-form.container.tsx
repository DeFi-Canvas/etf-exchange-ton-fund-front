import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { AddressForm } from './address-form.component';
import { WithdrowService } from '@/pages/withdrow/withdrow.store';

export const AddressFormContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    (store) =>
        memo(() => {
            return React.createElement(AddressForm);
        })
);
