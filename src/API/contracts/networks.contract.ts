import * as t from 'io-ts';

// /assets/{assetName}/networks
const networkCodec = t.type({
    created_at: t.number,
    description: t.string,
    id: t.string,
    image_url: t.string,
    isTestnet: t.boolean,
    name: t.string,
    updated_at: t.number,
});

export const networksCodec = t.array(networkCodec);
