import { mapNumberOptionToUI } from '@/components/ui-kit/fpts-components-utils/options-map';
import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';
import {
    formatCapsToSepareteCamel,
    formatDateToExtraStr,
    formatDateToStr,
} from '@/utils/string';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import css from './transaction.module.css';
import { TransactionStatusIcon } from '@/components/Icons/Icons';
import cn from 'classnames';

export type TransactionStatus =
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'SWAP'
    | 'MULTI-SWAP'
    | 'DEPOSIT'
    | 'BUY'
    | 'SELL'
    | 'PROCESSING'
    | 'ERROR';

export interface Transaction {
    type: O.Option<
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'SWAP'
        | 'MULTI-SWAP'
        | 'DEPOSIT'
        | 'BUY'
        | 'SELL'
    >;
    status: O.Option<TransactionStatus>;
    description: O.Option<string>;
    fullDate: O.Option<Date>;
    ammount: O.Option<number>;
    side: O.Option<'BUY' | 'SELL'>;
    currency: O.Option<string>;
    modificator: O.Option<
        'RECIVED' | 'SENT' | 'SUCCESS' | 'REJECT' | 'PROCESSING' | 'ERROR'
    >;
    pnl: O.Option<{
        ammount: number;
        currency: string;
        side: 'PROFIT' | 'LOSE';
    }>;
}

export const Transaction = ({
    type,
    fullDate,
    description,
    ammount,
    currency,
    modificator,
    pnl,
    side,
    status,
}: Transaction) => {
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
        <div className={css.wrap}>
            <div className={cn(css.row, css['mb-1'])}>
                <div className={css.description}>
                    <OptionSpan data={typeUI} />
                    {hasDescription && <OptionSpan data={description} />}
                </div>
                <div>
                    <OptionSpan
                        modificator={sideModificatorUI}
                        data={mapNumberOptionToUI(ammount)}
                    />
                    <OptionSpan data={currency} />
                </div>
            </div>
            <div className={css.row}>
                <div className={css.dateWrap}>
                    <Icon />
                    <OptionSpan data={dateUI} className={css.samllText} />
                </div>
                <OptionSpan data={modificatorUI} className={css.samllText} />
            </div>
        </div>
    );
};

export interface TransactionGroup {
    date: Date;
    transactions: Array<Transaction>;
}
export const TransactionGroup = ({ date, transactions }: TransactionGroup) => {
    return (
        <div className={css.blockWrap}>
            <span className={css.date}>{formatDateToExtraStr(date)}</span>
            <div className={css.groupWrap}>
                {transactions.map((t) => (
                    <Transaction
                        key={pipe(
                            t.fullDate,
                            O.map((date) => date.getMilliseconds()),
                            O.getOrElse(() => 0)
                        )}
                        {...t}
                    />
                ))}
            </div>
        </div>
    );
};
