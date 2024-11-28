import { useState } from 'react';
import css from './amount.module.css';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { initHapticFeedback } from '@telegram-apps/sdk-react';

// TODO: добавить ошибку слишком много
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
    // isNextButtonAvailable,
    availableBalance,
    symbolLogo,
}: AmountProps) => {
    const navigate = useNavigate();

    const [amountValue, setAmountValue] = useState<string>(
        pipe(
            amount,
            E.getOrElse(() => 0),
            (x) => `${x}`
        )
    );
    
    const hapticFeedback = initHapticFeedback();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const val = Number(inputValue);

        if(E.isLeft(amount)) {
            hapticFeedback.impactOccurred('soft')
            hapticFeedback.impactOccurred('light')
            hapticFeedback.impactOccurred('soft')
        }

        updateAmount(val);
        //WTF???
        setAmountValue(inputValue.replace(',', '.'));
    };

    return (
        <div className={css.wrap}>
            <span className={css.title}>Enter amount</span>
            <div className={css.inputSection}>
                <div className={css.inputWrap}>
                    <input
                        type="number"
                        inputMode="numeric"
                        className={cn(css.input, {
                            [css.err]: E.isLeft(amount),
                        })}
                        onChange={handleChange}
                        value={amountValue}
                    />
                    <span
                        className={cn(css.prefix, {
                            [css.err]: E.isLeft(amount),
                        })}
                    >
                        {currency}
                    </span>
                </div>
                <span className={cn(css.calc, { [css.err]: E.isLeft(amount) })}>
                    {E.isLeft(amount)
                        ? getAmountErrorsText(amount.left)
                        : approximateCost}
                </span>
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
                    <button
                        // disabled={!isNextButtonAvailable}
                        className={css.nextButton}
                        onClick={() => navigate('/withdraw/:ticker/address')}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};
