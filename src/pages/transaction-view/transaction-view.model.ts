import { TTransactionStatus } from '@whalet/components/transaction/types';

type TransactionStatus = 'SUCCESS' | 'PROCESSING' | 'ERROR' | 'GIFT';

export interface TransactionResponse {
    status: TransactionStatus;
    type: TTransactionStatus;
    amount: number;
    coinName: string;
    blockchainLink: string;
    data: { name: string; value: string }[];
}
