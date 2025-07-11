import { Property } from '@frp-ts/core';
import {
    valueWithEffect,
    ValueWithEffect,
} from '@/utils/run-view-model.utils.ts';
import { newLensedAtom } from '@frp-ts/lens';
import { Either } from 'fp-ts/lib/Either';
import * as E from 'fp-ts/Either';
import { injectable, token } from '@injectable-ts/core';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Asset } from '@/instance/asset/asset.model.ts';
import { PENDING, Error } from '@/store/errors/error-system';
import { assetsRestService } from '@/API/assets/assets.service';

export interface AssetsSingleViewModel {
    asset: Property<Either<string, Asset>>;
}

export interface NewAssetsSingleViewModel {
    (assetId: string): ValueWithEffect<AssetsSingleViewModel>;
}

export const newAssetsSingleViewModel = injectable(
    assetsRestService,
    (assetService): NewAssetsSingleViewModel =>
        (assetId) => {
            const asset = newLensedAtom<Either<Error, Asset>>(E.left(PENDING));

            const assetGetEffect = pipe(
                assetService.getAsset(assetId),
                tap(asset.set)
            );

            return valueWithEffect.new({ asset }, assetGetEffect);
        }
);
