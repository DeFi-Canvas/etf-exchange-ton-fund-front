import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import {
    authRequestOptions,
    handleGetRequest,
    performGetRequest,
} from '@/API/request.utils.ts';
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
import {
    Asset,
    AssetBalance,
    AssetCodec,
} from '@/instance/asset/asset.model.ts';
import { Error } from '@/store/errors/error-system';
import { injectable, token } from '@injectable-ts/core';
import { CacheStore } from '@/store/cache/cahe.store';
import { pipe } from 'fp-ts/lib/function';
import { waitWithCache } from '@/utils/stream';
import * as t from 'io-ts';

export interface AssetsRestService {
    getAsset: (assetId: string) => Stream<Either<Error, Asset>>;
    getAllAssets: () => Stream<Either<Error, Array<AssetBalance>>>;
}

const assetsApi = new AssetApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newAssetsRestService = injectable(
    CacheStore,
    (cacheStore): AssetsRestService => {
        return {
            getAsset: (assetId) =>
                pipe(
                    performGetRequest(
                        assetsApi.apiAssetAddressGet(
                            assetId,
                            authRequestOptions()
                        ),
                        assetResponseCodec,
                        assetResponseMapping
                    )
                ),
            getAllAssets: () =>
                pipe(
                    performGetRequest(
                        assetsApi.apiAssetGet(authRequestOptions()),
                        assetsResponseCodec,
                        assetsResponseMapping
                    ),
                    waitWithCache(
                        cacheStore,
                        'getAllAssets',
                        t.array(AssetCodec)
                    )
                ),
        };
    }
);

export const AssetsRestService = token('assetService')<AssetsRestService>();
