import css from './address-form.module.css';
import cn from 'classnames';
import * as E from 'fp-ts/Either';
import { useState } from 'react';
import { Amount } from '../../../components/amount/amount.component';
import { Error } from '@/store/errors/error-system';

interface AddressFormProps {
    ammount: E.Either<Error, number>;
    approximateCost: string;
    currency: string;
    symbolLogo: string;

    setAddress: (d: string) => void;

    texts: {
        address: string;
        placeholderAddress: string;
        tag: string;
        placeholderTag: string;
        commission: string;
    };
}

export const AddressForm = ({
    ammount,
    approximateCost,
    currency,
    setAddress,
    symbolLogo,
    texts,
}: AddressFormProps) => {
    const [currentAddress, setCurrentAddress] = useState('');
    const addressOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.currentTarget.value;
        setCurrentAddress(val);
        setAddress(val);
    };

    return (
        <div className={css.cardAddress}>
            <div className={cn('app-container', css.cardAddressContainer)}>
                <Amount
                    symbolLogo={symbolLogo}
                    ammount={ammount}
                    approximateCost={approximateCost}
                    currency={currency}
                />
                <section className={cn(css.section)}>
                    <div className={css.sectionTitle}>{texts.address}</div>
                    <textarea
                        value={currentAddress}
                        onChange={addressOnChange}
                        className={css.textField}
                        placeholder={texts.placeholderAddress}
                        rows={2}
                    />
                </section>
                <section className={cn(css.section)}>
                    <div className={css.sectionTitle}>{texts.commission}</div>
                    <span className={css.cardCommission}>0,5 TON</span>
                </section>
            </div>
        </div>
    );
};
