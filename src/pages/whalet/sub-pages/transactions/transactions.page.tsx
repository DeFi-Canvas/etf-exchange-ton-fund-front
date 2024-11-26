import * as E from 'fp-ts/Either';
import css from './transactions.module.css';
import { TransactionGroup } from '../../components/transaction/transaction.component';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { SkeletonCardSection } from '@/components/skeletons/skeleton-card/skeleton-card-section.component';

interface TransactionsPageProps {
    transactions: E.Either<string, Array<TransactionGroup>>;
}

export const Transactions = ({ transactions }: TransactionsPageProps) => {
    return (
        <div className={css.transactionsWrapper}>
            <RenderResult
                data={transactions}
                loading={() => <SkeletonCardSection count={4} type={'small'} />}
                success={(transactions) => (
                    <>
                        {transactions.map((t) => (
                            <TransactionGroup
                                key={t.date.getMilliseconds()}
                                {...t}
                            />
                        ))}
                    </>
                )}
            />
        </div>
    );
};
