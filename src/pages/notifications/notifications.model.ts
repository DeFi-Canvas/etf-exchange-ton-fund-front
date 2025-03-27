import { TransactionStatus } from '../whalet/components/transaction/types/transactionStatus';

export type NotificationStatus = TransactionStatus | 'INFO';

export interface Notification {
    message: string;
    status: NotificationStatus;
    timestamp: number;
}
