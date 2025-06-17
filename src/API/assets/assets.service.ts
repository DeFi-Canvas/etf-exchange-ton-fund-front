import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { authRequestOptions, handleGetRequest } from '@/API/request.utils.ts';
import { AssetApi, Configuration } from '@/API/scheme/rest-genereted';

import { DOMAIN_API_URL } from '@/API/API.ts';
import {
    assetResponseCodec,
    assetsResponseCodec,
} from '@/API/contracts/assets.contract.ts';
import {
    assetResponseMapping,
    assetsResponseMapping,
} from '@/pages/assets-single/asset-single.model.ts';
import { Asset, AssetBalance } from '@/instance/asset/asset.model.ts';
import { Errors } from '@/store/errors/erorr-systrm';
import { injectable, token } from '@injectable-ts/core';
import { CaheStore } from '@/store/cache/cahe.store';
import { pipe } from 'fp-ts/lib/function';
import { waitWithCache } from '@/utils/stream';

export interface AssetsRestService {
    getAssets: (assetId: string) => Stream<Either<Errors, Asset>>;
    getAllAssets: () => Stream<Either<Errors, Array<AssetBalance>>>;
}

const assetsApi = new AssetApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newAssetsRestService = injectable(
    CaheStore,
    (caheStore): AssetsRestService => {
        return {
            getAssets: (assetId) =>
                pipe(
                    handleGetRequest(
                        assetsApi.apiAssetAddressGet(
                            assetId,
                            authRequestOptions()
                        ),
                        assetResponseCodec,
                        assetResponseMapping
                    )(),
                    waitWithCache(caheStore, 'getAssets')
                ),
            getAllAssets: () =>
                pipe(
                    handleGetRequest(
                        assetsApi.apiAssetGet(authRequestOptions()),
                        assetsResponseCodec,
                        assetsResponseMapping
                    )(),
                    waitWithCache(caheStore, 'getAllAssets')
                ),
        };
    }
);

export const AssetsRestService =
    token('assetsRestService')<AssetsRestService>();
