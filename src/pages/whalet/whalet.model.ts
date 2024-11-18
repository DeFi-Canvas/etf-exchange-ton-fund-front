import { CoinCardTempProps } from '@/components/ui-kit/coin-card/coin-card.component';
import * as t from 'io-ts';

export interface WaletResponce {
    total: number;
    assets: Array<Asset>;
}

export type Asset = {
    name: string;
    symbol: string;
    balance: number;
    price: number;
    image_url: string;
    value: number;
};

export const AssetCodec = t.type({
    name: t.string,
    symbol: t.string,
    balance: t.number,
    price: t.number,
    image_url: t.string,
    value: t.number,
});

export const mapAssetsFromBalance = (data: WaletResponce) => data.assets;

export interface FundsRespnce {
    id: string;
    name: string;
    description: string;
    management_fee: number;
    image_url: string;
    is_dao: false;
    risk_score: string;
    updated_event: string;
    is_avaiable: boolean;
}

export const mapFunds = (data: FundsRespnce): CoinCardTempProps => ({
    logo: data.image_url,
    name: data.name,
    ticker: '',
    coinAmount: 228,
    cost: 0,
});
