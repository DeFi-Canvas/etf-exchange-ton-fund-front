import * as t from 'io-ts';

const assetCodec = t.type({
    name: t.string,
    ticker: t.string,
    category: t.string,
    description: t.string,
    image_url: t.string,
    price: t.number,
    withdrawal_fee: t.number,
});

// /assets
export const assetsCodec = t.array(assetCodec);
