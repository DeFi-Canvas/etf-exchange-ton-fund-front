import * as t from 'io-ts';

// /wallet/balance
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
