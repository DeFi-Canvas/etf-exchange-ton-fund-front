type TransactionStatus = 'SUCCESS' | 'PROCESSING' | 'ERROR' | 'GIFT';

/**
 * @deprecated wrong type
 */
export interface TransactionResponse {
    status: TransactionStatus;
    //@ts-ignore
    type: TTransactionStatus;
    amount: number;
    coinName: string;
    blockchainLink: string;
    data: { name: string; value: string }[];
}
