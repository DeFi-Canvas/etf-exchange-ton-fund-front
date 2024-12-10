import * as t from 'io-ts';

export const assetCodec = t.type({
    id: t.string,
    name: t.string,
    ticker: t.string,
    category: t.string,
    description: t.string,
    image_url: t.string,
    price: t.number,
    withdrawal_fee: t.number,
    market_cap: t.number,
    volume_24h: t.number,
});

// /assets
export const assetsCodec = t.array(assetCodec);
