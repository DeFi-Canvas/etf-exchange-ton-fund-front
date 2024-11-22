// import { CoinCardData } from '@/components/assets-card/assets-card.model';
import * as t from 'io-ts';
import { FundsData } from '../what-to-buy/what-to-buy.model';

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
    is_dao: boolean;
    risk_score: string;
    updated_event: string;
    is_avaiable: boolean;
    value: number;
}

interface Temp {
    total: number;
    funds: [
        {
            fund: {
                id: string;
                name: string;
                description: string;
                management_fee: number;
                image_url: string;
                is_dao: boolean;
                risk_score: string;
                updated_event: string;
                is_avaiable: boolean;
                PTonAddress: string;
                value: number;
            };
            value: number;
        },
    ];
}

export const mapWhaletFunds = (data: Temp): Array<FundsData> => {
    if (!data.funds.length) return [];
    return data.funds.map(({ fund: data }) => ({
        id: data.id,
        name: data.name,
        description: data.description,
        managementFee: data.management_fee,
        logo: data.image_url,
        isDao: data.is_dao,
        riskScore: data.risk_score,
        updatedEvent: data.updated_event,
        isAvaiable: data.is_avaiable,
        cost: data.value,
    }));
};

export const mapFunds = (data: FundsRespnce): FundsData => ({
    id: data.id,
    name: data.name,
    description: data.description,
    managementFee: data.management_fee,
    logo: data.image_url,
    isDao: data.is_dao,
    riskScore: data.risk_score,
    updatedEvent: data.updated_event,
    isAvaiable: data.is_avaiable,
    cost: data.value,
});

//TODO : тип будет расширен (я надеюсь)
export interface TransactionsResponce {
    timestamp: string; // ISO_DATETIME
    asset: {
        name: string;
        ticker: string;
        category: string;
        description: string;
        image_url: string;
        price: number;
        withdrawal_fee: number;
    };
    address: string;
    amount: number;
    value: number;
    tx: string;
}

export interface Transactions {
    timestamp: string; // ISO_DATETIME
    asset: {
        name: string;
        ticker: string;
        category: string;
        description: string;
        url: string;
        price: number;
        withdrawalFee: number;
    };
    address: string;
    amount: number;
    value: number;
    tx: string;
}
export const normolizeTransactionKey = (
    data: TransactionsResponce
): Transactions => ({
    ...data,
    asset: {
        name: data.asset.name,
        ticker: data.asset.ticker,
        category: data.asset.category,
        description: data.asset.description,
        price: data.asset.price,
        url: data.asset.image_url,
        withdrawalFee: data.asset.withdrawal_fee,
    },
});
