import getFormattedDate from '@/libs/date-format';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import css from './transaction.module.css';
import TransactionCard from './components/transaction-card/transaction-card.component';
import { ITransaction } from './types';

export interface TransactionGroup {
    date: Date;
    transactions: Array<ITransaction>;
}

export const TransactionGroup = ({ date, transactions }: TransactionGroup) => {
    return (
        <div className={css.transactionSection}>
            <span className={css.transactionTitle}>{getFormattedDate(date)}</span>
            <div className={css.transactionCardWrapper}>
                {transactions.map((t) => (
                    <TransactionCard
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
