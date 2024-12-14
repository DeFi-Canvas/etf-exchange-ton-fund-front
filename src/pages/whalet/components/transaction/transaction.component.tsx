import getFormattedDate from '@/libs/date-format';
import css from './transaction.module.css';
import TransactionCard from './components/transaction-card/transaction-card.component';
import { ITransaction } from './types';
import { v7 as uuidv7 } from 'uuid';

export interface TransactionGroup {
    date: Date;
    transactions: Array<ITransaction>;
}

export const TransactionGroup = ({ date, transactions }: TransactionGroup) => {
    return (
        <div className={css.transactionSection}>
            <span className={css.transactionTitle}>
                {getFormattedDate(date)}
            </span>
            <div className={css.transactionCardWrapper}>
                {transactions.map((transaction) => (
                    <TransactionCard key={uuidv7()} {...transaction} />
                ))}
            </div>
        </div>
    );
};
