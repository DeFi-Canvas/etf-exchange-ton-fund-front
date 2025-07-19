import { AssetBalance } from '@/instance/asset/asset.model';
import * as t from 'io-ts';
import { WalletBalanceResponse } from '@/API/wallet/wallet.contract';

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

//#region UI
export const AssetCodec = t.type({
    name: t.string,
    balance: t.number,
    price: t.number,
    imageUrl: t.string,
    value: t.number,
    ticker: t.string,
});

export const mapAssetsFromBalance = (
    data: WalletBalanceResponse
): Array<AssetBalance> =>
    data.payload.assets.map((asset) => ({
        ...asset,
        imageUrl: asset.image_url,
    }));
