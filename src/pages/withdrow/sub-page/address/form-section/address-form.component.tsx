import css from './address-form.module.css';
import cn from 'classnames';
import * as E from 'fp-ts/Either';
import { useState } from 'react';
import { Amount } from '../../../components/amount/amount.component';

interface AddressFormProps {
    ammount: E.Either<string, number>;
    approximateCost: string;
    currency: string;

    address: E.Either<string, string>;
    memo: E.Either<string, string>;
    setAddress: (d: string) => void;
    setMemo: (d: string) => void;
}

export const AddressForm = ({
    ammount,
    approximateCost,
    currency,
    address,
    memo,
    setAddress,
    setMemo,
}: AddressFormProps) => {
    const [currentAddress, setCurrentAddress] = useState(() =>
        E.isRight(address) ? address.right : ''
    );
    const addressOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.currentTarget.value;
        setCurrentAddress(val);
        setAddress(val);
    };

    const [currentMemo, setCurrentMemo] = useState(() =>
        E.isRight(memo) ? memo.right : ''
    );
    const memoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setCurrentMemo(val);
        setMemo(val);
    };

    return (
        <div className={css.wrap}>
            <Amount
                ammount={ammount}
                approximateCost={approximateCost}
                currency={currency}
            />

            <div className={cn(css.column, css.inputs)}>
                <span className={css.title}>Withdraw address</span>
                <textarea
                    value={currentAddress}
                    onChange={addressOnChange}
                    className={css.input}
                    placeholder="Input or press and hold to paste the withdrawal address"
                />
            </div>
            <div className={cn(css.column, css.inputs)}>
                <span className={css.title}>
                    Tag/Memo (Comment/Note/Remark)
                </span>
                <input
                    className={css.input}
                    placeholder="Enter your tag"
                    value={currentMemo}
                    onChange={memoOnChange}
                />
            </div>

            <div className={cn(css.column, css.inputs)}>
                <span className={css.title}>Commission</span>
                <span className={css.commission}>0,5 TON ≈ 2,06 USD </span>
            </div>
        </div>
    );
};
