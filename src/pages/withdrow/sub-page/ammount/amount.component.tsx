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
        <div className={cn('app-container', css.page)}>
            <h2 className={css.title}>Enter amount</h2>
            <div className={css.cardFieldAmount}>
                <AmountField
                    currency={currency}
                    value={amountValue}
                    handleChange={handleChange}
                    isError={E.isLeft(amount)}
                />
                <RenderResult
                    data={amount}
                    failure={(err) => (
                        <span
                            className={cn(css.currencyRatio, css.invalidError)}
                        >
                            {getAmountErrorsText(err)}
                        </span>
                    )}
                    success={() => (
                        <span className={css.currencyRatio}>
                            {approximateCost}
                        </span>
                    )}
                />
            </div>
            <div className={css.balance}>
                <img
                    src={symbolLogo}
                    alt="Current asset"
                    className={css.imageAsset}
                />
                <div className={css.balanceInfo}>
                    <div className={css.balanceInfoTitle}>
                        Available balance
                    </div>
                    <div className={css.balanceInfoValue}>
                        {availableBalance}
                    </div>
                </div>
            </div>
            <AppButton
                label={
                    isNextButtonAvailable
                        ? 'Continue'
                        : 'Enter the total amount'
                }
                type={isNextButtonAvailable ? 'default' : 'secondary'}
                to={isNextButtonAvailable ? '/withdraw/:ticker/address' : ''}
                className={css.button}
            />
        </div>
    );
};
