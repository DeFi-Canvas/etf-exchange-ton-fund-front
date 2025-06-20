import { Transaction as TransactionDataType } from '@/API/transactions/transactions.responce.contract';
import { TransactionTypeIcon } from '@/components/Icons/Icons';
import { formatDateToStr } from '@/utils/string';
import { mapTransactionTypeToUi } from '../../transactions.model';
import cn from 'classnames';
import { TransactionSwapMonyInfo } from '../mony-info..swap.component';

import css from './transaction.card.module.css';
import { useMemo } from 'react';

interface TransactionProps extends TransactionDataType {}

export const Transaction = ({
    type,
    createdAt,
    entries,
    status,
}: TransactionProps) => {
    const isError = status === 'FAILED' || status === 'EXPIRED';
    const isPending = status === 'AUTHORIZED';
    const transactionType = useMemo(
        () => mapTransactionTypeToUi(type),
        [mapTransactionTypeToUi, type]
    );

    return (
        <div className={css.transaction}>
            <TransactionTypeIcon type={type} />
            <div className={css.transactionInfoContainer}>
                <div className={css.transactionColumn}>
                    <div className={css.title}>{transactionType}</div>
                    <div className={css.date}>
                        {formatDateToStr(new Date(createdAt))}
                    </div>
                </div>
                <div
                    className={cn(css.transactionColumn, {
                        [css.error]: isError,
                        [css.pending]: isPending,
                    })}
                >
                    <TransactionSwapMonyInfo entries={entries} type={type} />
                </div>
            </div>
        </div>
    );
};
