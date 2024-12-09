import * as t from 'io-ts';

export interface Assets {
    id: string;
    img: string;
    title: string;
    subTitle: string;
    price?: string;
    priceText?: string;
}

export const assetsCodec = t.type({
    id: t.string,
    img: t.string,
    title: t.string,
    subTitle: t.string,
    price: t.union([t.string, t.undefined]),
    priceText: t.string,
});

export interface AssetsPnl extends Assets {
    pnl: {
        value: string;
        status: 'UP' | 'DOWN';
    };
}

export const assetsPnlCodec = t.type({
    id: t.string,
    img: t.string,
    title: t.string,
    subTitle: t.string,
    price: t.union([t.string, t.undefined]),
    pnl: t.type({
        value: t.string,
        status: t.union([t.literal('UP'), t.literal('DOWN')]),
    }),
});

// нечто подобное ожидаем с бека
export interface CoinCardData {
    id: string;
    logo: string;
    name: string;
    ticker: string;
    coinAmount: number;
    cost: number;
    pnl?: {
        amount: number;
        currency: string;
        side: 'PROFIT' | 'LOSE';
        persent: number;
    };
    type?: 'primary' | 'secondory';
}
