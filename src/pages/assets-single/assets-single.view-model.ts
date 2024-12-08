import { Property } from '@frp-ts/core';
import { AssetsRestService } from '@/API/assets.service.ts';
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
import { AssetResponseMapping } from '@/pages/assets-single/asset-single.model.ts';

export interface AssetsSingleViewModel {
    asset: Property<Either<string, AssetResponseMapping>>;
}

export interface NewAssetsSingleViewModel {
    (assetId: string): ValueWithEffect<AssetsSingleViewModel>;
}

export const newAssetsSingleViewModel = injectable(
    token('assetRestService')<AssetsRestService>(),
    (assetService): NewAssetsSingleViewModel =>
        (assetId) => {
            const asset = newLensedAtom<Either<string, AssetResponseMapping>>(
                E.left('pending')
            );

            const assetGetEffect = pipe(
                assetService.getAssets(assetId),
                tap(asset.set)
            );

            return valueWithEffect.new({ asset }, assetGetEffect);
        }
);
