import { useNavigate } from 'react-router-dom';
import css from './final.module.css';
import * as E from 'fp-ts/Either';
import img from '../../../../assets/images/finalgif.gif';
import cn from 'classnames';

interface FinalProps {
    amount: E.Either<string, number>;
    currency: string;
    address: E.Either<string, string>;
}

export const Final = ({ amount, currency, address }: FinalProps) => {
    const navigate = useNavigate();
    return (
        <div className={css.wrap}>
            <span className={css.currency}>{currency} is on the way</span>
            <span className={css.normal}>
                Your transaction is being processed. You can follow the status
                in the “Transactions” section.
            </span>
            <img src={img} alt="" />
            <span className={css.amount}>
                The amount of {E.isRight(amount) && amount.right} {currency} has
                been sent to:
            </span>
            <span className={cn(css.normal, css.address)}>
                {E.isRight(address) && address.right}
            </span>
            <div className={css.footer}>
                <button
                    className={css.transactions}
                    onClick={() => navigate('/#transactions')}
                >
                    View the transaction
                </button>
                <button className={css.finish} onClick={() => navigate('/')}>
                    Finish
                </button>
            </div>
        </div>
    );
};
