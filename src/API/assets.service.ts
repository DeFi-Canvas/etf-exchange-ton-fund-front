import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { getRequestGenerated } from '@/API/request.utils.ts';
// import { AssetssApi, Configuration } from '@/API/scheme/rest-genereted';
import { AssetsApi, Configuration } from '@/API/scheme/rest-genereted';

import { DOMAIN_API_URL } from '@/API/API.ts';
import { assetCodec } from '@/API/contracts/assets.contract.ts';
import {
    assetsMapping,
    AssetResponseMapping,
} from '@/pages/assets-single/asset-single.model.ts';

export interface AssetsRestService {
    getAssets: (
        assetId: string
    ) => Stream<Either<string, AssetResponseMapping>>;
}

const assetsApi = new AssetsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newAssetsRestService = (): AssetsRestService => {
    return {
        getAssets: (assetId) => {
            return getRequestGenerated(
                assetsApi.assetAddressGet(assetId),
                assetCodec,
                assetsMapping
            )();
        },
    };
};
