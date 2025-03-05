import { AssetResponce } from '@/instance/asset/asset.model';

export interface AssetResponseMapping {
    id: string;
    name: string;
    ticker: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;
    withdrawalFee: number;
}
export const assetsMapping = (asset: AssetResponce): AssetResponseMapping => {
    return {
        id: asset.id,
        name: asset.name,
        ticker: asset.ticker,
        category: asset.category,
        description: asset.description,
        price: asset.price,
        imageUrl: asset.image_url,
        withdrawalFee: asset.withdrawal_fee,
    };
};
