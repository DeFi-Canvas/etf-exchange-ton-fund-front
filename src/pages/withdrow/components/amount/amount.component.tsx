import css from './amount.module.css';
import * as E from 'fp-ts/Either';

interface AmountProps {
    ammount: E.Either<string, number>;
    approximateCost: string;
    currency: string;
}

export const Amount = ({ ammount, approximateCost, currency }: AmountProps) => {
    return (
        <div className={css.amount}>
            <span className={css.title}>Withdraw amount</span>
            <div className={css.coinInfo}>
                <img src="" alt="" />
                <div className={css.column}>
                    <span className={css.title}>
                        {E.isRight(ammount) && ammount.right} {currency}
                    </span>
                    <span className={css.sub}>{approximateCost}</span>
                </div>
                <div className={css.column}>
                    <span className={css.title}>TRC 20</span>
                    <span className={css.sub}>Tron Network</span>
                </div>
            </div>
        </div>
    );
};
