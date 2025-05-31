import * as t from 'io-ts';

// /fund/{fund_id}
const assetCodec = t.type({
    description: t.string,
    image_url: t.string,
    name: t.string,
    price: t.number,
    ticker: t.string,
    withdrawal_fee: t.number,
    id: t.string,
});

const assetItemCodec = t.type({
    allocation_percentage: t.number,
    asset: assetCodec,
});

export const fundByIdResponseCodec = t.type({
    assets: t.array(assetItemCodec),
    description: t.string,
    id: t.string,
    image_url: t.string,
    is_dao: t.boolean,
    management_fee: t.number,
    name: t.string,
    risk_score: t.string,
    value: t.number,
});
