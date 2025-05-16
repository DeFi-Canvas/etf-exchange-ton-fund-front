import * as t from 'io-ts';

export const assetCodec = t.type({
    id: t.string, // +
    name: t.string, // +
    ticker: t.string, // +
    description: t.string, // +
    image_url: t.string, // +
    price: t.number, // +
    withdrawal_fee: t.number,
    // market_cap: t.number
});

// /assets
export const assetsCodec = t.array(assetCodec);

export interface ModelsAsset {
    /**
     *
     * @type {string}
     * @memberof ModelsAsset
     */
    description?: string;
    /**
     *
     * @type {string}
     * @memberof ModelsAsset
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof ModelsAsset
     */
    image_url?: string;
    /**
     *
     * @type {number}
     * @memberof ModelsAsset
     */
    market_cap?: number;
    /**
     *
     * @type {string}
     * @memberof ModelsAsset
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof ModelsAsset
     */
    network_id?: string;
    /**
     *
     * @type {number}
     * @memberof ModelsAsset
     */
    price?: number;
    /**
     *
     * @type {string}
     * @memberof ModelsAsset
     */
    ticker?: string;
    /**
     *
     * @type {number}
     * @memberof ModelsAsset
     */
    volume_24h?: number;
    /**
     *
     * @type {number}
     * @memberof ModelsAsset
     */
    withdrawal_fee?: number;
}
