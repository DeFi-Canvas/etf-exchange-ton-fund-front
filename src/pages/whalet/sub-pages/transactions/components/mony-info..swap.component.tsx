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
}: TransactionSwapMonyInfoProps): JSX.Element => {
    const { debit, credit } = formatSwapEntries(entries);
    switch (type) {
        case 'SWAP':
            return (
                <div className={css.transactionMonyInfo}>
                    <span className={css.credit}>
                        +{credit?.amount} {credit?.asset.ticker}
                    </span>
                    <span className={css.debit}>
                        -{debit?.amount} {debit?.asset.ticker}
                    </span>
                </div>
            );
        case 'TRANSFER':
        case 'ADD_LIQUIDITY':
        case 'REMOVE_LIQUIDITY':
        case 'STAKE':
        case 'UNSTAKE':
        case 'BORROW':
        case 'REPAY':
        case 'DEPOSIT':
        case 'DEPOSIT_STORM_USDT':
            return (
                <div className={css.transactionMonyInfo}>
                    <span className={css.credit}>
                        +{credit?.amount} {credit?.asset.ticker}
                    </span>
                    <span className={css.debit}>
                        -{debit?.amount} {debit?.asset.ticker}
                    </span>
                </div>
            );
        case 'WITHDRAW':
        case 'WITHDRAW_STORM_USDT':
        case 'LIQUIDATE':
        case 'CLAIM_REWARDS':
        case 'GOVERNANCE_VOTE':
        case 'MARGIN_TRADE':
        case 'SYNTHETIC_MINT':
        case 'CROSS_CHAIN_SWAP':
            return (
                <div className={css.transactionMonyInfo}>
                    <span className={css.credit}>
                        +{credit?.amount} {credit?.asset.ticker}
                    </span>
                </div>
            );
    }
};
