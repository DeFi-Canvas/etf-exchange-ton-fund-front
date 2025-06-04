import * as t from 'io-ts';

// /wallet/balance
const assetCodec = t.type({
    id: t.string,
    name: t.string,
    ticker: t.string,
    balance: t.number,
    price: t.number,
    image_url: t.string,
    value: t.number,
});

export const walletBalanceCodec = t.type({
    assets: t.array(assetCodec),
    total: t.number,
});
