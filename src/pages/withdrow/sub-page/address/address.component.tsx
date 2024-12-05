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
                <div className={css.page}>
                    <div className="app-container">
                        <h2 className={css.title}>Enter address</h2>
                    </div>
                    <AddressFormContainer />
                    <FooterContainer />
                </div>
            );
        })
);
