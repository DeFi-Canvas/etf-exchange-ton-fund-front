import { AssetBalance } from '@/instance/asset/asset.model';
import { FundRespnce, FundsData } from '@/instance/fund/fund.model';
import { TransactionsResponce } from '@/instance/transactions/transactions.model';
import { either } from 'fp-ts';
import * as t from 'io-ts';
import { AssetDto } from '@/API/contracts/assets.contract.ts';
import { WalletBalanceResponse } from '@/API/contracts/walletBalance.contract.ts';

//#region RESPONCE
export interface WalletAssetResponse {
    id: string;
    name: string;
    ticker: string;
    balance: number;
    price: number;
    image_url: string;
    value: number;
}

export interface WaletResponce {
    total: number;
    assets: Array<WalletAssetResponse>;
}

export interface WalletFundsResponse {
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
        asset: AssetDto;
        allocation_percentage: number;
    }>;
    created_at: string;
}

interface WhaletFundsResponce {
    total: number;
    funds: [
        {
            fund: FundRespnce;
            value: number;
        },
    ];
}

//#region UI
export const AssetCodec = t.type({
    name: t.string,
    // symbol: t.string,
    balance: t.number,
    price: t.number,
    imageUrl: t.string,
    value: t.number,
});

export interface WalletTransactions {
    timestamp: string; // ISO_DATETIME
    asset: {
        name: string;
        ticker: string;
        // category: string;
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
): WalletTransactions => ({
    ...data,
    asset: {
        name: data.asset.name,
        ticker: data.asset.ticker,
        description: data.asset.description,
        price: data.asset.price,
        url: data.asset.image_url,
        withdrawalFee: data.asset.withdrawal_fee,
    },
    transactionType: data.transaction_type,
    transactionStatus: data.transaction_status,
});

export const mapAssetsFromBalance = (
    data: WalletBalanceResponse
): Array<AssetBalance> =>
    data.payload.assets.map((asset) => ({
        ...asset,
        imageUrl: asset.image_url,
    }));

export const assetsFromBalanceValidation = (data: WaletResponce) => {
    if (data.total === 0) {
        //TODO переименовать в пустое состояние
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

export const mapFunds = (data: WalletFundsResponse): FundsData => ({
    id: data.id,
    name: data.name,
    description: data.description,
    managementFee: data.management_fee,
    logo: data.image_url,
    riskScore: data.risk_score,
    isAvaiable: data.is_avaiable,
    cost: data.value,
    assets: [],
    tvlValue: data.value,
    createdAt: data.created_at,
});
