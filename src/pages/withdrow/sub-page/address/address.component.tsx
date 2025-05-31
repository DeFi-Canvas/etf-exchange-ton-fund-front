import { injectable, token } from '@injectable-ts/core';
import css from './address.module.css';
import { AddressFormContainer } from './form-section/address-form.container';
import { memo } from 'react';
import { FooterContainer } from './footer/footer.container';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

export const Address = injectable(
    AddressFormContainer,
    FooterContainer,
    token('i18n')<I18NService>(),
    (AddressFormContainer, FooterContainer, i18n) =>
        memo(() => {
            const { Address } = useProperty(i18n.Withdraw);
            return (
                <div className={css.page}>
                    <div className="app-container">
                        <h2 className={css.title}>{Address.title}</h2>
                    </div>
                    <AddressFormContainer />
                    <FooterContainer />
                </div>
            );
        })
);
