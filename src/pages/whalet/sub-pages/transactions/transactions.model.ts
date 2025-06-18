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
    const groupedByDate: Array<{ data: string; transactions: Transactions }> =
        [];

    for (const transaction of transactions) {
        const data = new Date(transaction.createdAt)
            .toISOString()
            .split('T')[0];

        const id = groupedByDate.findIndex((x) => x.data === data);

        if (!groupedByDate[id]) {
            groupedByDate.push({ data, transactions: [transaction] });
        } else {
            groupedByDate[id] = {
                ...groupedByDate[id],
                transactions: [...groupedByDate[id].transactions, transaction],
            };
        }
    }
    return groupedByDate;
}
