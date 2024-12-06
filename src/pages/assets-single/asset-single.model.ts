export interface AssetResponse {
    id: string;
    name: string;
    ticker: string;
    category: string;
    description: string;
    image_url: string;
    price: number;
    withdrawal_fee: number;
}

export interface AssetResponseMapping extends AssetResponse {
    imageUrl: string;
    withdrawalFee: number;
}
export const assetMapping = (asset: AssetResponse): AssetResponseMapping => {
    return {
        ...asset,
        imageUrl: asset.image_url,
        withdrawalFee: asset.withdrawal_fee,
    }
}
