import {
    TransactionEntry,
    TransactionType,
} from '@/API/transactions/transactions.responce.contract';
import css from '../components/transaction/transaction.card.module.css';
import { formatSwapEntries } from '../transactions.model';

interface TransactionSwapMonyInfoProps {
    entries: Array<TransactionEntry>;
    type: TransactionType;
}
export const TransactionSwapMonyInfo = ({
    entries,
    type,
}: TransactionSwapMonyInfoProps) => {
    const { debit, credit } = formatSwapEntries(entries);
    switch (type) {
        case 'SWAP':
            return (
                <div className={css.transactionMonyInfo}>
                    <span className={css.credit}>+{credit?.amount}</span>
                    <span className={css.debit}>-{debit?.amount}</span>
                </div>
            );
        default:
            return null;
    }
};
