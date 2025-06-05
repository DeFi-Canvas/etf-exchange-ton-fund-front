import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { authRequestOptions, handleGetRequest } from '@/API/request.utils.ts';
import { AssetApi, Configuration } from '@/API/scheme/rest-genereted';

import { DOMAIN_API_URL } from '@/API/API.ts';
import { assetResponseCodec } from '@/API/contracts/assets.contract.ts';
import { assetResponseMapping } from '@/pages/assets-single/asset-single.model.ts';
import { Asset } from '@/instance/asset/asset.model.ts';

export interface AssetsRestService {
    getAssets: (assetId: string) => Stream<Either<string, Asset>>;
}

const assetsApi = new AssetApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newAssetsRestService = (): AssetsRestService => {
    return {
        getAssets: (assetId) => {
            return handleGetRequest(
                assetsApi.apiAssetAddressGet(assetId, authRequestOptions()),
                assetResponseCodec,
                assetResponseMapping
            )();
        },
    };
};
