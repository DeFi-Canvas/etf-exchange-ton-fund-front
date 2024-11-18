import { TTransactionStatus } from './index';
import * as O from 'fp-ts/Option';

export interface ITransaction {
    type: O.Option<
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'SWAP'
        | 'MULTI-SWAP'
        | 'DEPOSIT'
        | 'BUY'
        | 'SELL'
    >;
    status: O.Option<TTransactionStatus>;
    description: O.Option<string>;
    fullDate: O.Option<Date>;
    amount: O.Option<number>;
    side: O.Option<'BUY' | 'SELL'>;
    currency: O.Option<string>;
    modificator: O.Option<
        'RECIVED' | 'SENT' | 'SUCCESS' | 'REJECT' | 'PROCESSING' | 'ERROR'
    >;
    pnl: O.Option<{
        amount: number;
        currency: string;
        side: 'PROFIT' | 'LOSE';
    }>;
}
