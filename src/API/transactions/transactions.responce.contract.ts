import * as t from 'io-ts';
import { assetCodec } from '../assets/assets.contract';

export const transactionStatusCodec = t.union([
    t.literal('AUTHORIZED'),
    t.literal('CAPTURED'),
    t.literal('CANCELED'),
    t.literal('FAILED'),
    t.literal('EXPIRED'),
]);
export type TransactionStatus = t.TypeOf<typeof transactionStatusCodec>;

export const transactionTypeCodec = t.union([
    t.literal('TRANSFER'),
    t.literal('SWAP'),
    t.literal('ADD_LIQUIDITY'),
    t.literal('REMOVE_LIQUIDITY'),
    t.literal('STAKE'),
    t.literal('UNSTAKE'),
    t.literal('BORROW'),
    t.literal('REPAY'),
    t.literal('DEPOSIT'),
    t.literal('DEPOSIT_STORM_USDT'),
    t.literal('WITHDRAW'),
    t.literal('WITHDRAW_STORM_USDT'),
    t.literal('LIQUIDATE'),
    t.literal('CLAIM_REWARDS'),
    t.literal('GOVERNANCE_VOTE'),
    t.literal('MARGIN_TRADE'),
    t.literal('SYNTHETIC_MINT'),
    t.literal('CROSS_CHAIN_SWAP'),
]);
export type TransactionType = t.TypeOf<typeof transactionTypeCodec>;

export const transactionEntryType = t.union([
    t.literal('DEBIT'),
    t.literal('CREDIT'),
    t.literal('RESERVE'),
    t.literal('RELEASE'),
    t.literal('FEE'),
    t.literal('APP_FEE'),
    t.literal('DEX_FEE'),
    t.literal('SLIPPAGE'),
    t.literal('NETWORK_FEE'),
    t.literal('SERVICE_FEE'),
    t.literal('REWARD'),
    t.literal('TON_FEE_RESERVE'),
    t.literal('TON_FEE'),
]);
export type TransactionEntryType = t.TypeOf<typeof transactionEntryType>;

export const transactionEntry = t.type({
    id: t.string,
    transactionId: t.string,
    userId: t.string,
    asset: assetCodec,
    type: transactionEntryType,
    amount: t.number,
    createdAt: t.string,
    isReserve: t.boolean,
    sign: t.number,
});

export type TransactionEntry = t.TypeOf<typeof transactionEntry>;

export const transactionCodec = t.type({
    id: t.string,
    userId: t.string,
    type: transactionTypeCodec,
    status: transactionStatusCodec,
    blockchainHash: t.string,
    createdAt: t.string,
    updatedAt: t.string,
    entries: t.array(transactionEntry),
});
export type Transaction = t.TypeOf<typeof transactionCodec>;

export const transactionsCodec = t.array(transactionCodec);
export type Transactions = t.TypeOf<typeof transactionsCodec>;

export const transactionsResponseCodec = t.type({
    payload: transactionsCodec,
    pagination: t.type({
        pageIndex: t.number,
        pageSize: t.number,
        totalPages: t.number,
        totalEntries: t.number,
        currentEntries: t.number,
    }),
});

export type TransactionResponse = t.TypeOf<typeof transactionsResponseCodec>;

//#region Deposit
const depositCodec = t.type({
    address: t.string,
    memo: t.string,
    qrimgsrc: t.string,
});
export type Deposit = t.TypeOf<typeof depositCodec>;

export const depositResponseCodec = t.type({
    payload: depositCodec,
});

export type DepositResponse = t.TypeOf<typeof depositResponseCodec>;
