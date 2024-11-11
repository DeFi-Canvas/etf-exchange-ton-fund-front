import { injectable } from '@injectable-ts/core';
import css from './address.module.css';
import { AddressFormContainer } from './form-section/address-form.container';
import { memo } from 'react';
import { FooterContainer } from './footer/footer.container';

export const Address = injectable(
    AddressFormContainer,
    FooterContainer,
    (AddressFormContainer, FooterContainer) =>
        memo(() => {
            return (
                <div className={css.wrap}>
                    <span className={css.title}>Enter address</span>
                    <AddressFormContainer />
                    {/* TODO не поднимается вместе с клавиатурой */}
                    <FooterContainer />
                </div>
            );
        })
);
