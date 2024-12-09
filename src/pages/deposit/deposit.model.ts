import * as t from 'io-ts';

export interface DepositAssetsResponce {
    id: string;
    name: string;
    ticker: string;
    category: string;
    description: string;
    image_url: string;
}

export interface DepositDetails {
    address: string;
    memo: string;
    qrimgsrc: string;
}

export const mapDepositDetails = (data: DepositDetails) => ({
    ...data,
    qrCode: data.qrimgsrc,
});

export const mapDepositAssets = (
    data: DepositAssetsResponce
): DepositAssets => ({
    id: data.id,
    name: data.name,
    ticker: data.ticker,
    description: data.description,
    category: data.category,
    img: data.image_url,
});

export interface DepositAssets {
    id: string;
    name: string;
    ticker: string;
    description: string;
    category: string;
    img: string;
}

export const DepositAssetsCodec = t.type({
    name: t.string,
    ticker: t.string,
    category: t.string,
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
