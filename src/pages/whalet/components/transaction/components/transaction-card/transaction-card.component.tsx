import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import {
    formatCapsToSepareteCamel,
    formatDateToStr,
} from '@/utils/string';
import { mapNumberOptionToUI } from '@/components/ui-kit/fpts-components-utils/options-map';
import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';
import { ITransaction } from '../../types';
import { TransactionStatusIcon } from '@/components/Icons/Icons';
import cn from 'classnames';
import css from './transaction-card.module.css';

const TransactionCard = ({
    type,
    fullDate,
    description,
    amount,
    currency,
    modificator,
    side,
    status,
}: ITransaction) => {
    const typeUI = pipe(type, O.map(formatCapsToSepareteCamel));
    const modificatorUI = pipe(modificator, O.map(formatCapsToSepareteCamel));
    const dateUI = pipe(fullDate, O.map(formatDateToStr));
    const sideModificatorUI = pipe(
        side,
        O.map((side) => (side === 'BUY' ? '+' : '-')),
        O.getOrElse(() => '')
    );
    const hasDescription = pipe(description, O.isSome);
    const Icon = () =>
        pipe(
            status,
            O.map((s) => (
                // eslint-disable-next-line react/jsx-key
                <TransactionStatusIcon status={s} className={css.icon} />
            )),
            O.getOrElse(() => <> </>)
        );

    return (
        <div className={css.card}>
            <div className={cn(css.cardInfo, css.cardInfoStart)}>
                <div className={css.cardInfoTitle}>
                    <OptionSpan data={typeUI} />
                    &nbsp;
                    {hasDescription && <OptionSpan data={description} />}
                </div>
                <div className={css.statusDateWrapper}>
                    <Icon />
                    <OptionSpan data={dateUI} />
                </div>
            </div>
            <div className={cn(css.cardInfo, css.cardInfoEnd)}>
                <div>
                    <OptionSpan
                        modificator={sideModificatorUI}
                        data={mapNumberOptionToUI(amount)}
                    />
                    <OptionSpan data={currency} />
                </div>
                <div className={css.status}>
                    <OptionSpan data={modificatorUI} />
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
