import { useState } from 'react';
import css from './ammount.module.css';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

type AmmountErrors = 'too small';

const getAmmountErrorsText = (err: AmmountErrors) => {
    switch (err) {
        case 'too small':
            return 'Minimum amount: 1 TON';
    }
};

interface AmmountProps {
    currency: string;
    updateAmmount: (val: number) => void;
    ammount: E.Either<AmmountErrors, number>;
    approximateCost: string;
    isNextButtonAvailable: boolean;
    availableBalance: number;
}

export const Ammount = ({
    currency,
    updateAmmount,
    ammount,
    approximateCost,
    isNextButtonAvailable,
    availableBalance,
}: AmmountProps) => {
    const navigate = useNavigate();

    const [ammountValue, setAmmountValue] = useState<string>(
        pipe(
            ammount,
            E.getOrElse(() => 0),
            (x) => `${x}`
        )
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const val = Number(inputValue);

        updateAmmount(val);
        //WTF???
        setAmmountValue(inputValue.replace(',', '.'));
    };

    return (
        <div className={css.wrap}>
            <span className={css.title}>Enter amount</span>
            <div className={css.inputSection}>
                <div className={css.inputWrap}>
                    <input
                        type="number"
                        className={cn(css.input, {
                            [css.err]: E.isLeft(ammount),
                        })}
                        onChange={handleChange}
                        value={ammountValue}
                    />
                    <span
                        className={cn(css.prefix, {
                            [css.err]: E.isLeft(ammount),
                        })}
                    >
                        {currency}
                    </span>
                </div>
                <span
                    className={cn(css.calc, { [css.err]: E.isLeft(ammount) })}
                >
                    {E.isLeft(ammount)
                        ? getAmmountErrorsText(ammount.left)
                        : approximateCost}
                </span>
            </div>
            <div className={css.footerWrap}>
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
