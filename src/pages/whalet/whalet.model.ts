import { walletBalanceCodec } from '@/API/contracts/walletBalance.contract';
import { either } from 'fp-ts';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
// import { FundsData } from '../what-to-buy/what-to-buy.model';

// TODO: -> Asset, Funds, Transactions

//#region RESPONCE
export interface WaletResponce {
    total: number;
    assets: Array<AssetResponce>;
}

export type AssetResponce = {
    id: string;
    name: string;
    symbol: string;
    balance: number;
    price: number;
    image_url: string;
    value: number;
};

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
    assets: Array<{
        asset: {
            id: string;
            name: string;
            ticker: string;
            category: string;
            description: string;
            image_url: string;
            price: number;
            withdrawal_fee: number;
        };
        allocation_percentage: number;
    }>;
}

interface WhaletFundsResponce {
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
        }
    ];
}

//#region UI
export type Asset = {
    id: string;
    name: string;
    symbol: string;
    balance: number;
    price: number;
    logo: string;
    value: number;
};

export interface FundsData {
    id: string;
    name: string;
    description: string;
    managementFee: number;
    logo: string;
    isDao: boolean;
    riskScore: string;
    updatedEvent: string;
    isAvaiable: boolean;
    cost: number;
    assets: Array<Asset & { allocationPercentage: number }>;
}

export const AssetCodec = t.type({
    name: t.string,
    symbol: t.string,
    balance: t.number,
    price: t.number,
    logo: t.string,
    value: t.number,
});

export const mapAssetsFromBalance = (data: WaletResponce): Array<Asset> =>
    data.assets.map((asset) => ({ ...asset, logo: asset.image_url }));

// #region getAssetsValidations
export const mapAssetsFromBalanceValidation = (data: WaletResponce) => {
    if (data.total === 0) {
        // переименовать в пустое состояние
        return either.left('error');
    }
};

export const assetsIsValidData = (data: WaletResponce) => {
    if (!walletBalanceCodec.is(data)) {
        console.log(PathReporter.report(walletBalanceCodec.decode(data)));
    }
    return data;
};

export const mapWhaletFunds = (data: WhaletFundsResponce): Array<FundsData> => {
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
        assets: [],
    }));
};

export const getWhaletFundsValidation = (data: WhaletFundsResponce) => {
    if (data.total === 0) {
        return either.left('error');
    }
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
    assets: [],
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
