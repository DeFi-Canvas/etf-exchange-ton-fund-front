import css from './amount.module.css';
import * as E from 'fp-ts/Either';
import cn from 'classnames';

interface AmountProps {
    ammount: E.Either<string, number>;
    approximateCost: string;
    currency: string;
    symbolLogo: string;
}

export const Amount = ({
    ammount,
    approximateCost,
    currency,
    symbolLogo,
}: AmountProps) => {
    return (
        <div className={css.amountWrapper}>
            <div className={css.amountTitle}>Withdraw amount</div>

            <div className={css.coinInfo}>
                <img src={symbolLogo} className={css.coinInfoImage} />
                <div className={cn(css.column, css.columnWide)}>
                    <span className={css.coinInfoTitle}>
                        {E.isRight(ammount) && ammount.right} {currency}
                    </span>
                    <span className={css.coinInfoSubtitle}>
                        {approximateCost}
                    </span>
                </div>
                <div className={css.column}>
                    <span className={css.coinInfoTitle}>TON</span>
                    <span className={css.coinInfoSubtitle}>Ton Network</span>
                </div>
            </div>
        </div>
    );
};
