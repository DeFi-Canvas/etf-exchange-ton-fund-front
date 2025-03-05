import { Asset } from '@/instance/asset/asset.model';
import { FundsData, FundsRespnce } from '../whalet/whalet.model';
import { InterfacePurchaseSellAssetCardData } from './sub-page/types';

export type PageType = 'BUY' | 'SELL';
export const isAssetAvailible = (type: PageType) => type === 'BUY';

export const mapFunds = (data: FundsRespnce): FundsData => ({
    id: data.id,
    name: data.name,
    description: data.description,
    managementFee: data.management_fee,
    logo: data.image_url,
    riskScore: data.risk_score,
    updatedEvent: data.updated_event,
    isAvaiable: data.is_avaiable,
    cost: 1,
    assets: data.assets.map(({ asset, allocation_percentage }) => ({
        id: asset.id,
        name: asset.name,
        symbol: asset.ticker,
        balance: asset.price,
        price: asset.price,
        logo: asset.image_url,
        value: 0,
        allocationPercentage: allocation_percentage,
        ticker: asset.ticker,
    })),
    tvlValue: data.value,
    createdAt: data.created_at,
});

export const mapAssetToUICard = (
    asset: Asset,
    allowedOpen?: boolean,
    isBackgroundWhite?: boolean
): InterfacePurchaseSellAssetCardData => ({
    imageSrc: asset.logo,
    title: `$ ${(asset.price * asset.balance).toFixed(2)}`,
    subTitle: `${(asset.balance ?? 0).toFixed(2)} ${asset.symbol}`,
    price: `${asset.price}`,
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
