import { NewToastdata } from '@/store/toaster.store';
import { TransactionStatus } from '../whalet/components/transaction/types/transactionStatus';

export type NotificationStatus = TransactionStatus | 'INFO';

export interface Notification {
    message: string;
    status: NotificationStatus;
    timestamp: number;
}

export interface NotificationUI {
    date: string;
    body: Array<NewToastdata>;
}
