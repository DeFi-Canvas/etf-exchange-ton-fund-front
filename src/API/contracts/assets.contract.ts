import * as t from 'io-ts';

export const assetCodec = t.type({
    id: t.string, // +
    name: t.string, // +
    ticker: t.string, // +
    description: t.string, // +
    imageUrl: t.string, // +
    price: t.number, // +
    withdrawalFee: t.number,
    // marketCap: t.number
});

export type AssetPayload = t.TypeOf<typeof assetCodec>;

// /assets
export const assetsCodec = t.array(assetCodec);

export const assetResponseCodec = t.type({
    payload: assetCodec,
});

export type AssetResponse = t.TypeOf<typeof assetResponseCodec>;

export const assetsResponseCodec = t.type({
    payload: assetsCodec,
});

export type AssetsResponse = t.TypeOf<typeof assetsResponseCodec>;
