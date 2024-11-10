import { useEffect, useState } from 'react';
import css from './amount.module.css';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

type AmountErrors = 'too small';

const getAmountErrorsText = (err: AmountErrors) => {
    switch (err) {
        case 'too small':
            return 'Minimum amount: 1 TON';
    }
};

interface AmountProps {
    currency: string;
    updateAmount: (val: number) => void;
    amount: E.Either<AmountErrors, number>;
    approximateCost: string;
    isNextButtonAvailable: boolean;
    availableBalance: number;
}

export const Amount = ({
    currency,
    updateAmount,
    amount,
    approximateCost,
    isNextButtonAvailable,
    availableBalance,
}: AmountProps) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Проверяем изменение высоты окна
            setIsKeyboardOpen(window.innerHeight < window.outerHeight - 100);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigate = useNavigate();

    const [amountValue, setAmountValue] = useState<string>(
        pipe(
            amount,
            E.getOrElse(() => 0),
            (x) => `${x}`
        )
    );

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
            <div
                className={cn(css.footerWrap, {
                    [css.activeKeyboard]: isKeyboardOpen,
                })}
            >
                <div className={css.availableBalance}>
                    <img src="" alt="img" />
                    <div className={css.infoWrap}>
                        <span className={css.title}>Available balance</span>
                        <span className={css.balance}>{availableBalance}</span>
                    </div>
                </div>
                <div className={css.footer}>
                    <button
                        disabled={!isNextButtonAvailable}
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
