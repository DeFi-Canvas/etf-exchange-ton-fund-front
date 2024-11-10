import css from './address-form.module.css';
import cn from 'classnames';
import * as E from 'fp-ts/Either';

interface AddressFormProps {
    ammount: E.Either<'too small', number>;
    approximateCost: string;
    currency: string;
}

export const AddressForm = ({
    ammount,
    approximateCost,
    currency,
}: AddressFormProps) => {
    return (
        <div className={css.wrap}>
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

            <div className={cn(css.column, css.inputs)}>
                <span className={css.title}>Withdraw address</span>
                <textarea
                    name=""
                    className={css.input}
                    placeholder="Input or press and hold to paste the withdrawal address"
                />
            </div>
            <div className={cn(css.column, css.inputs)}>
                <span className={css.title}>
                    Tag/Memo (Comment/Note/Remark)
                </span>
                <input
                    name=""
                    className={css.input}
                    placeholder="Enter your tag"
                />
            </div>

            <div className={cn(css.column, css.inputs)}>
                <span className={css.title}>Commission</span>
                <span className={css.commission}>0,5 TON ≈ 2,06 USD </span>
            </div>
        </div>
    );
};
