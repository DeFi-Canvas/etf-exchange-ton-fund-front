import { AssetResponse } from '@/API/contracts/assets.contract.ts';

export interface AssetResponseMapping {
    id: string;
    name: string;
    ticker: string;
    description: string;
    price: number;
    imageUrl: string;
    withdrawalFee: number;
}

export const assetsMapping = ({
    payload: asset,
}: AssetResponse): AssetResponseMapping => {
    return {
        id: asset.id,
        name: asset.name,
        ticker: asset.ticker,
        description: asset.description,
        price: asset.price,
        imageUrl: asset.imageUrl,
        withdrawalFee: asset.withdrawalFee,
    };
};
