import * as E from 'fp-ts/Either';
import css from './transactions.module.css';
import { TransactionGroup } from '../../components/transaction/transaction.component';

interface TransactionsPageProps {
    transactions: E.Either<string, Array<TransactionGroup>>;
}

export const Transactions = ({ transactions }: TransactionsPageProps) => {
    return (
        <div className={css.transactionsWrapper}>
            {E.isRight(transactions) &&
                transactions.right.map((t) => (
                    <TransactionGroup key={t.date.getMilliseconds()} {...t} />
                ))}
        </div>
    );
};
