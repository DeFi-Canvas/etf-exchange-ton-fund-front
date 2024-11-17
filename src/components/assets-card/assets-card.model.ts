import * as t from 'io-ts';

export interface Assets {
    img: string;
    title: string;
    subTitle: string;
    price?: string;
}

export const assetsCodec = t.type({
    img: t.string,
    title: t.string,
    subTitle: t.string,
    price: t.union([t.string, t.undefined]),
});

export interface AssetsPnl extends Assets {
    pnl: {
        value: string;
        status: string; // TODO: Временно заменил просто на строку, чтоб не ругался тип
    };
}

export const assetsPnlCodec = t.type({
    img: t.string,
    title: t.string,
    subTitle: t.string,
    price: t.union([t.string, t.undefined]),
    pnl: t.type({
        value: t.string,
        status: t.string,
    }),
});
