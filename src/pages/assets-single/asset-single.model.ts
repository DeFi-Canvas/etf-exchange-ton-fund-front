import {
    AssetDto,
    AssetResponse,
    AssetsResponse,
} from '@/API/assets/assets.contract';
import { Asset } from '@/instance/asset/asset.model.ts';

const assetMapping = (asset: AssetDto): Asset => ({
    id: asset.id,
    name: asset.name,
    contractAddress: asset.contract_address,
    address0: asset.address0,
    address1: asset.address1,
    decimals: asset.decimals,
    description: asset.description,
    imageUrl: asset.image_url,
    marketCap: asset.market_cap,
    networkId: asset.network_id,
    price: asset.price,
    ticker: asset.ticker,
    volume24h: asset.volume_24h,
    withdrawalFee: asset.withdrawal_fee,
});

export const assetResponseMapping = ({ payload }: AssetResponse): Asset =>
    assetMapping(payload);

export const assetsResponseMapping = ({ payload }: AssetsResponse): Asset[] =>
    payload.map(assetMapping);
