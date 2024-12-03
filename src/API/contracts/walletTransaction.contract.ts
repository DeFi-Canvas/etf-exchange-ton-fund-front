import * as t from 'io-ts';

// /wallet/transactions
const assetCodec = t.type({
    category: t.string,
    description: t.string,
    image_url: t.string,
    name: t.string,
    price: t.number,
    ticker: t.string,
    withdrawal_fee: t.number,
});

const transactionCodec = t.type({
    address: t.string,
    amount: t.number,
    asset: assetCodec,
    timestamp: t.string,
    tx: t.string,
    value: t.number,
});

export const transactionListCodec = t.array(transactionCodec);
