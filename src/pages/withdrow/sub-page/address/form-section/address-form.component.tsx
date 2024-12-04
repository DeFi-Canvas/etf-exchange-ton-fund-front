import css from './address-form.module.css';
import cn from 'classnames';
import * as E from 'fp-ts/Either';
import { useState } from 'react';
import { Amount } from '../../../components/amount/amount.component';

interface AddressFormProps {
    ammount: E.Either<string, number>;
    approximateCost: string;
    currency: string;
    symbolLogo: string;

    setAddress: (d: string) => void;
    setMemo: (d: string) => void;
}

export const AddressForm = ({
    ammount,
    approximateCost,
    currency,
    setAddress,
    setMemo,
    symbolLogo,
}: AddressFormProps) => {
    const [currentAddress, setCurrentAddress] = useState('');
    const addressOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.currentTarget.value;
        setCurrentAddress(val);
        setAddress(val);
    };

    const [currentMemo, setCurrentMemo] = useState('');
    const memoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setCurrentMemo(val);
        setMemo(val);
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
                    <div className={css.sectionTitle}>Withdraw address</div>
                    <textarea
                        value={currentAddress}
                        onChange={addressOnChange}
                        className={css.textField}
                        placeholder="Input or press and hold to paste the withdrawal address"
                        rows={2}
                    />
                </section>
                <section className={cn(css.section)}>
                    <div className={css.sectionTitle}>
                        Tag/Memo (Comment/Note/Remark)
                    </div>
                    <input
                        className={css.textField}
                        placeholder="Enter your tag"
                        value={currentMemo}
                        onChange={memoOnChange}
                    />
                </section>
                <section className={cn(css.section)}>
                    <div className={css.sectionTitle}>Commission</div>
                    <span className={css.cardCommission}>0,5 TON ≈ 2,06 USD </span>
                </section>
            </div>
        </div>
    );
};
