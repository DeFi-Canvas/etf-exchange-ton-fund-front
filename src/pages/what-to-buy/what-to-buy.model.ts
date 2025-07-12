import { AssetBalance } from '@/instance/asset/asset.model';
import { InterfacePurchaseSellAssetCardData } from './sub-page/types';
import { FundsData } from '@/instance/fund/fund.model';

export type PageType = 'BUY' | 'SELL';
export const isAssetAvailible = (type: PageType) => type === 'BUY';

export const mapAssetToUICard = (
    asset: AssetBalance,
    allowedOpen?: boolean,
    isBackgroundWhite?: boolean
): InterfacePurchaseSellAssetCardData => ({
    imageSrc: asset.imageUrl,
    title: `$ ${(asset.price * asset.balance).toFixed(2)}`,
    subTitle: `${(asset.balance ?? 0).toFixed(2)} ${asset.ticker}`,
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
