import * as t from 'io-ts';

// #region balance
const assetBalanceCodec = t.type({
    id: t.string,
    name: t.string,
    ticker: t.string,
    balance: t.number,
    price: t.number,
    image_url: t.string,
    value: t.number,
});

export const walletBalanceCodec = t.type({
    assets: t.array(assetBalanceCodec),
    total: t.number,
});

export const walletBalanceResponseCodec = t.type({
    payload: walletBalanceCodec,
});

export type WalletBalanceResponse = t.TypeOf<typeof walletBalanceResponseCodec>;

// #region withdraw
const withdraw = t.type({
    address: t.string,
    amount: t.number,
    ticker: t.string,
});
export type WithdrawArgs = t.TypeOf<typeof withdraw>;

export const withdrawPayloadCodec = t.type({
    payload: withdraw,
});

export type WithdrawPayload = t.TypeOf<typeof withdrawPayloadCodec>;
