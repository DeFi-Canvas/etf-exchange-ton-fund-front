import * as t from 'io-ts';

// /wallet/balance
const assetCodec = t.type({
    id: t.string,
    balance: t.number,
    image_url: t.string,
    name: t.string,
    price: t.number,
    symbol: t.string,
    value: t.number,
});

export const walletBalanceCodec = t.type({
    assets: t.union([t.array(assetCodec), t.undefined]),
    total: t.number,
});
