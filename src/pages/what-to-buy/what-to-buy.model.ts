import { Asset, FundsRespnce } from '../whalet/whalet.model';
import { InterfacePurchaseSellAssetCardData } from './sub-page/types';

export type PageType = 'BUY' | 'SELL';
export const isAssetAvailible = (type: PageType) => type === 'BUY';

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
    //TODO: need to normolize
    assets: Array<{
        asset: Asset & { allocationPercentage: number };
    }>;
}

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
    cost: 1,
    assets: data.assets.map((asset) => ({
        asset: {
            name: asset.asset.name,
            symbol: asset.asset.ticker,
            balance: asset.asset.price,
            price: asset.asset.price,
            logo: asset.asset.image_url,
            value: 0,
            allocationPercentage: asset.allocation_percentage,
        },
    })),
});

export const mapAssetToUICard = (
    date: Asset,
    allowedOpen?: boolean,
    isBackgroundWhite?: boolean
): InterfacePurchaseSellAssetCardData => ({
    imageSrc: date.logo,
    title: `${(date.balance ?? 0).toFixed(2)} ${date.symbol}`,
    subTitle: `$ ${(date.price * date.balance).toFixed(2)}`,
    price: `${date.price}`,
    allowedOpen: allowedOpen ?? true,
    isBackgroundWhite: isBackgroundWhite ?? false,
});

export const mapFundToUICard = (
    date: FundsData,
    allowedOpen?: boolean,
    isBackgroundWhite?: boolean
): InterfacePurchaseSellAssetCardData => ({
    imageSrc: date.logo,
    title: date.name,
    subTitle: date.description,
    price: `$ ${date.cost}`,
    allowedOpen: allowedOpen ?? true,
    isBackgroundWhite: isBackgroundWhite ?? false,
});
