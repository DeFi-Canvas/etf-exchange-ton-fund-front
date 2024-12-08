/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TransactionGroup } from '../../components/transaction/transaction.component';
import { ITransaction } from '../../components/transaction/types';
import { Transactions } from '../../whalet.model';
import * as O from 'fp-ts/Option';

export function transformTransactions(
    transactions: Transactions[]
): TransactionGroup[] {
    const groupedByDate: Record<string, Transactions[]> = {};
    for (const transaction of transactions) {
        const dateKey = new Date(transaction.timestamp)
            .toISOString()
            .split('T')[0]; // YYYY-MM-DD
        if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = [];
        }
        groupedByDate[dateKey].push(transaction);
    }

    return Object.entries(groupedByDate).map(([date, transactions]) => ({
        date: new Date(date),
        transactions: transactions.map(transformTransaction),
    }));
}

// TODO нужно переделать весь компонент и всратые типы
function transformTransaction(transaction: Transactions): ITransaction {
    return {
        //@ts-ignore
        type: O.some(transaction.transactionType.toUpperCase() ?? 'BUY'),
        //@ts-ignore
        status: O.some(transaction.transactionType.toUpperCase()),
        //@ts-ignore
        modificator: O.some(
            transaction.transactionStatus.toUpperCase() ?? 'DEPOSIT'
        ),
        description: O.some(transaction.asset.description),
        fullDate: O.some(new Date(transaction.timestamp)),
        amount: O.some(transaction.amount),
        side: O.none,
        currency: O.some(transaction.asset.ticker),
        pnl: O.none,
    };
}
