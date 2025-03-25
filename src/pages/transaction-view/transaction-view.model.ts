import { TransactionStatus as TransactionType } from '@whalet/components/transaction/types';

type TransactionStatus = 'SUCCESS' | 'PROCESSING' | 'ERROR' | 'GIFT';

export interface TransactionResponse {
    status: TransactionStatus;
    type: TransactionType;
    amount: number;
    coinName: string;
    blockchainLink: string;
    data: { name: string; value: string }[];
}
