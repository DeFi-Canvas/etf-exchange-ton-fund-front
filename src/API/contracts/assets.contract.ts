import * as t from 'io-ts';

export const assetCodec = t.type({
    id: t.string,
    name: t.string,
    contract_address: t.string,
    address0: t.string,
    address1: t.string,
    decimals: t.number,
    description: t.string,
    image_url: t.string,
    market_cap: t.number,
    network_id: t.string,
    price: t.number,
    ticker: t.string,
    volume_24h: t.number,
    withdrawal_fee: t.number,
});

export type AssetDto = t.TypeOf<typeof assetCodec>;

export const assetResponseCodec = t.type({
    payload: assetCodec,
});

export type AssetResponse = t.TypeOf<typeof assetResponseCodec>;

export const assetsResponseCodec = t.type({
    payload: t.array(assetCodec),
});

export type AssetsResponse = t.TypeOf<typeof assetsResponseCodec>;
