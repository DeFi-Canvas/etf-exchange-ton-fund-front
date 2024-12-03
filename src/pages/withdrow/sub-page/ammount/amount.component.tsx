import { useState } from 'react';
import css from './amount.module.css';
import * as E from 'fp-ts/Either';
import cn from 'classnames';
import AmountField from './amount-field/amount-field.component';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import AppButton from '@/components/app-button/app-button.component.tsx';

export type AmountErrors = 'too small' | 'too big';

const getAmountErrorsText = (err: AmountErrors) => {
    switch (err) {
        case 'too small':
            return 'Minimum amount: 1 TON';
        case 'too big':
            return 'Insufficient balance';
    }
};

interface AmountProps {
    currency: string;
    updateAmount: (val: number) => void;
    amount: E.Either<AmountErrors, number>;
    approximateCost: string;
    isNextButtonAvailable: boolean;
    availableBalance: number;
    symbolLogo: string;
}

export const Amount = ({
    currency,
    updateAmount,
    amount,
    approximateCost,
    isNextButtonAvailable,
    availableBalance,
    symbolLogo,
}: AmountProps) => {
    const [amountValue, setAmountValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const val = Number(inputValue);

        updateAmount(val);
        //WTF???
        setAmountValue(inputValue.replace(',', '.'));
    };

    return (
        <div className={css.wrap}>
            <span className={css.title}>Enter amount</span>
            <div className={css.inputSection}>
                <div className={css.inputWrap}>
                    <AmountField
                        currency={currency}
                        value={amountValue}
                        handleChange={handleChange}
                        isError={E.isLeft(amount)}
                    />
                </div>
                <RenderResult
                    data={amount}
                    failure={(err) => (
                        <span className={cn(css.calc, css.err)}>
                            {getAmountErrorsText(err)}
                        </span>
                    )}
                    success={() => (
                        <span className={css.calc}>{approximateCost}</span>
                    )}
                />
            </div>
            {/* TODO не поднимается вместе с клавиатурой */}
            <div className={cn(css.footerWrap)}>
                <div className={css.availableBalance}>
                    <img src={symbolLogo} alt="img" className={css.imgFooter} />
                    <div className={css.infoWrap}>
                        <span className={css.title}>Available balance</span>
                        <span className={css.balance}>{availableBalance}</span>
                    </div>
                </div>
                <div className={css.footer}>
                    <AppButton
                        label="Continue"
                        isDisabled={!isNextButtonAvailable}
                        to={'/withdraw/:ticker/address'}
                    />
                </div>
            </div>
        </div>
    );
};
