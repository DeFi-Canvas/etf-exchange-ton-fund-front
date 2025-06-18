import { Transactions as TransactionsDataType } from '@/API/transactions/transactions.responce.contract';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import * as E from 'fp-ts/Either';
import { Transaction } from './components/transaction/transaction.component';
import css from './transactions.module.css';
import getFormattedDate from '@/libs/date-format';
import { Loader } from '@/components/loader/loader.component';
import { Error } from '@/store/errors/error-system';

interface TransactionsProps {
    transactions: E.Either<Error, Record<string, TransactionsDataType>>;
}

export const Transactions = ({ transactions }: TransactionsProps) => {
    return (
        <div>
            <RenderResult
                data={transactions}
                loading={() => <Loader size="small" />}
                success={(transactions) => {
                    return (
                        <div className={css.wrap}>
                            {Object.keys(transactions).map((group) => {
                                return (
                                    <div key={group}>
                                        <span className={css.date}>
                                            {getFormattedDate(new Date(group))}
                                        </span>
                                        <div className={css.transactions}>
                                            {transactions[group].map(
                                                (transaction) => (
                                                    <Transaction
                                                        key={transaction.id}
                                                        {...transaction}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            />
        </div>
    );
};
