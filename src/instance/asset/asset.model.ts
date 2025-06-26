import { Eq } from 'fp-ts/Eq';
import * as t from 'io-ts';

export interface Asset {
    id: string;
    name: string;
    contractAddress: string;
    address0: string;
    address1: string;
    decimals: number;
    description: string;
    imageUrl: string;
    marketCap: number;
    networkId: string;
    price: number;
    ticker: string;
    volume24h: number;
    withdrawalFee: number;
}

export const AssetCodec = t.type({
    id: t.string,
    name: t.string,
    contractAddress: t.string,
    address0: t.string,
    address1: t.string,
    decimals: t.number,
    description: t.string,
    imageUrl: t.string,
    marketCap: t.number,
    networkId: t.string,
    price: t.number,
    ticker: t.string,
    volume24h: t.number,
    withdrawalFee: t.number,
});

export interface AssetBalance {
    id: string;
    name: string;
    ticker: string;
    balance: number;
    price: number;
    imageUrl: string;
    value: number;
}

export const AssetBalanceCodec = t.type({
    id: t.string,
    name: t.string,
    ticker: t.string,
    balance: t.number,
    price: t.number,
    imageUrl: t.string,
    value: t.number,
});

export const AssetBalanceEq: Eq<AssetBalance> = {
    equals: (p1, p2) => p1.id === p2.id && p1.ticker === p2.ticker,
};
