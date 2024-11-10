import { injectable } from '@injectable-ts/core';
import css from './address.module.css';
import { AddressFormContainer } from './form-section/address-form.container';
import { memo } from 'react';

export const Address = injectable(
    AddressFormContainer,
    (AddressFormContainer) =>
        memo(() => {
            return (
                <div className={css.wrap}>
                    <span className={css.title}>Enter address</span>
                    <AddressFormContainer />
                </div>
            );
        })
);
