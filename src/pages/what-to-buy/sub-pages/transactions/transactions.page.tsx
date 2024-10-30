import * as O from 'fp-ts/Option';
import {
    Transaction,
    TransactionGroup,
} from '../../components/transaction/transaction.component';

const MOCK_TRANSACTION: Transaction = {
    type: O.some('MULTI-SWAP'),
    description: O.none,
    fullDate: O.some(new Date('2023-05-11')),
    ammount: O.some(100),
    side: O.some('BUY'),
    currency: O.some('TON'),
    modificator: O.some('RECIVED'),
    pnl: O.none,
    status: O.some('WITHDRAW'),
};

// const TRANSACTIONS_MOCK: TransactionGroup = {
//     date: new Date(),
//     transactions: [
//         { ...MOCK_TRANSACTION },
//         { ...MOCK_TRANSACTION, fullDate: O.some(new Date(2023)) },
//     ],
// };

const TRANSACTIONS_PAGE_MOCK: Array<TransactionGroup> = [
    {
        date: new Date(),
        transactions: [
            {
                ...MOCK_TRANSACTION,
                type: O.some('DEPOSIT'),
                status: O.some('DEPOSIT'),
            },
            {
                ...MOCK_TRANSACTION,
                type: O.some('WITHDRAW'),
                modificator: O.some('SENT'),
            },
            {
                ...MOCK_TRANSACTION,
                type: O.some('WITHDRAW'),
                modificator: O.some('PROCESSING'),
                status: O.some('PROCESSING'),
            },
        ],
    },
    {
        date: new Date('2024-10-27'),
        transactions: [
            {
                ...MOCK_TRANSACTION,
                type: O.some('SWAP'),
                status: O.some('SWAP'),
                //TODO: добавить ПНЛ
            },
            {
                ...MOCK_TRANSACTION,
                type: O.some('MULTI-SWAP'),
                status: O.some('MULTI-SWAP'),
                modificator: O.some('SUCCESS'),
            },
            {
                ...MOCK_TRANSACTION,
                type: O.some('WITHDRAW'),
                modificator: O.some('ERROR'),
                status: O.some('ERROR'),
            },
            {
                ...MOCK_TRANSACTION,
                type: O.some('BUY'),
                modificator: O.some('SUCCESS'),
                status: O.some('BUY'),
                description: O.some('Kirill’s stable fund long description'),
            },
        ],
    },
    {
        date: new Date('2024-9-27'),
        transactions: [
            {
                ...MOCK_TRANSACTION,
                type: O.some('SELL'),
                status: O.some('SELL'),
            },
            {
                ...MOCK_TRANSACTION,
                type: O.some('WITHDRAW'),
                modificator: O.some('SENT'),
            },
            {
                ...MOCK_TRANSACTION,
                type: O.some('WITHDRAW'),
                modificator: O.some('PROCESSING'),
                status: O.some('PROCESSING'),
            },
        ],
    },
];

export const Transactions = () => {
    return (
        <div>
            {TRANSACTIONS_PAGE_MOCK.map((t) => (
                <TransactionGroup key={t.date.getMilliseconds()} {...t} />
            ))}
            {/* <TransactionGroup {...TRANSACTIONS_MOCK} /> */}
            {/* <Transaction {...MOCK_TRANSACTION} /> */}
        </div>
    );
};
