import * as t from 'io-ts';
import { AssetsResponse } from '@/API/contracts/assets.contract.ts';

export interface DepositAssetPayload {
    id: string;
    name: string;
    ticker: string;
    description: string;
    image_url: string;
}

export const mapDepositAssets = ({ payload }: AssetsResponse): DepositAsset[] =>
    payload.map((assets) => ({
        id: assets.id,
        name: assets.name,
        ticker: assets.ticker,
        description: assets.description,
        img: assets.image_url,
    }));

export interface DepositAsset {
    id: string;
    name: string;
    ticker: string;
    description: string;
    img: string;
}

export const DepositAssetsCodec = t.type({
    name: t.string,
    ticker: t.string,
    description: t.string,
    img: t.string,
});

export interface WithdrowAssets {
    name: string;
    ticker: string;
    description: string;
    amount: number;
    img: string;
}

export const WithdrowAssetsCodec = t.type({
    name: t.string,
    ticker: t.string,
    description: t.string,
    img: t.string,
    amount: t.number,
});
