import {
    Transaction,
    TransactionEntry,
    Transactions,
    TransactionType,
} from '@/API/transactions/transactions.responce.contract';

export const mapTransactionTypeToUi = (type: TransactionType) => {
    const [first, ...dictionary] = type.toLocaleLowerCase().split('_');
    const [firstLetter, ...restFirstWorld] = first.split('');
    const firstWorld = [
        firstLetter.toLocaleUpperCase(),
        restFirstWorld.join(''),
    ].join('');
    return [firstWorld, dictionary].join(' ');
};

export const formatSwapEntries = (entries: Array<TransactionEntry>) => {
    const debit = entries.find((e) => e.type === 'DEBIT');
    const credit = entries.find((e) => e.type === 'CREDIT');
    return { debit, credit };
};

export function formatTransactions(transactions: Transactions) {
    const groupedByDate: Record<string, Transactions> = {};
    for (const transaction of transactions) {
        const dateKey = new Date(transaction.createdAt)
            .toISOString()
            .split('T')[0];

        if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = [];
        }
        groupedByDate[dateKey].push(transaction);
    }
    return groupedByDate;
}
