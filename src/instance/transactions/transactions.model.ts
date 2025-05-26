import { AssetResponce } from '../asset/asset.model';

export interface TransactionsResponce {
    timestamp: string; // ISO_DATETIME
    asset: AssetResponce;
    address: string;
    amount: number;
    value: number;
    tx: string;
    transaction_type: string;
    transaction_status: string;
}
