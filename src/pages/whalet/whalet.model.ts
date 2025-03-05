import { Asset, AssetResponce } from '@/instance/asset/asset.model';
import { either } from 'fp-ts';
import * as t from 'io-ts';

//#region RESPONCE
export interface WaletResponce {
    total: number;
    assets: Array<WalletAssetResponce>;
}

export interface WalletAssetResponce extends AssetResponce {
    symbol: string;
    balance: number;
    value: number;
}

export interface FundsRespnce {
    id: string;
    name: string;
    description: string;
    management_fee: number;
    image_url: string;
    risk_score: string;
    updated_event: string;
    is_avaiable: boolean;
    value: number;
    assets: Array<{
        asset: AssetResponce;
        allocation_percentage: number;
    }>;
    created_at: string;
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
                created_at: string;
            };
            value: number;
        },
    ];
}

//#region UI
export interface FundsData {
    id: string;
    name: string;
    description: string;
    managementFee: number;
    logo: string;
    riskScore: string;
    updatedEvent: string;
    isAvaiable: boolean;
    cost: number;
    assets: Array<Asset & { allocationPercentage: number }>;
    tvlValue: number;
    createdAt: string;
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
export const assetsFromBalanceValidation = (data: WaletResponce) => {
    if (data.total === 0) {
        // переименовать в пустое состояние
        return either.left('error');
    }
};

export const mapWhaletFunds = (data: WhaletFundsResponce): Array<FundsData> => {
    if (!data.funds.length) return [];
    return data.funds.map(({ fund: fundData }) => ({
        id: fundData.id,
        name: fundData.name,
        description: fundData.description,
        managementFee: fundData.management_fee,
        logo: fundData.image_url,
        riskScore: fundData.risk_score,
        updatedEvent: fundData.updated_event,
        isAvaiable: fundData.is_avaiable,
        cost: data.total,
        assets: [],
        tvlValue: fundData.value,
        createdAt: fundData.created_at,
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
    riskScore: data.risk_score,
    updatedEvent: data.updated_event,
    isAvaiable: data.is_avaiable,
    cost: data.value,
    assets: [],
    tvlValue: data.value,
    createdAt: data.created_at,
});

//TODO : тип будет расширен (я надеюсь)
export interface TransactionsResponce {
    timestamp: string; // ISO_DATETIME
    asset: AssetResponce;
    address: string;
    amount: number;
    value: number;
    tx: string;
    transaction_type: string;
    transaction_status: string;
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
    transactionType: string;
    transactionStatus: string;
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
    transactionType: data.transaction_type,
    transactionStatus: data.transaction_status,
});
