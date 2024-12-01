import { useNavigate } from 'react-router-dom';
import css from './final.module.css';
import * as E from 'fp-ts/Either';
import img from '../../../../assets/images/joyful_duck.gif';
import cn from 'classnames';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';

interface FinalProps {
    amount: E.Either<string, number>;
    currency: string;
    address: E.Either<string, string>;
    onClick: () => void;
}

export const Final = ({ amount, currency, address, onClick }: FinalProps) => {
    const navigate = useNavigate();
    return (
        <div className={css.wrap}>
            <span className={css.currency}>{currency} is on the way</span>
            <span className={css.normal}>
                Your transaction is being processed. You can follow the status
                in the “Transactions” section.
            </span>
            <img src={img} alt="" />
            <RenderResult
                data={amount}
                success={(amount) => (
                    <span className={css.amount}>
                        The amount of {amount} {currency} has been sent to:
                    </span>
                )}
            />
            <RenderResult
                data={address}
                success={(address) => (
                    <span className={cn(css.normal, css.address)}>
                        {address}
                    </span>
                )}
            />
            <div className={css.footer}>
                <button
                    className={css.transactions}
                    onClick={() => {
                        navigate('/#transactions');
                        onClick();
                    }}
                >
                    View the transaction
                </button>
                <button
                    className={css.finish}
                    onClick={() => {
                        navigate('/');
                        onClick();
                    }}
                >
                    Finish
                </button>
            </div>
        </div>
    );
};
