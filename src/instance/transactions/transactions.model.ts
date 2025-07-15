import { AssetDto } from '@/API/assets/assets.contract';

export interface TransactionsResponce {
    timestamp: string; // ISO_DATETIME
    asset: AssetDto;
    address: string;
    amount: number;
    value: number;
    tx: string;
    transaction_type: string;
    transaction_status: string;
}
