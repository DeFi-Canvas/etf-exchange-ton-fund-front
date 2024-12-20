import { injectable, token } from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/whalet.service';
import { newLensedAtom } from '@frp-ts/lens';
import { UserStoreService } from '@/store/user.store';
import { CoinCardData } from '@/components/assets-card/assets-card.model';

export interface AssetsViewModel {
    assets: Property<E.Either<string, Array<CoinCardData>>>;
}

export interface NewAssetsViewModel {
    (): ValueWithEffect<AssetsViewModel>;
}

export const newAssetsViewModel = injectable(
    token('userStore')<UserStoreService>(),
    newWaletRestService,
    (userStore, waletRestService): NewAssetsViewModel =>
        () => {
            const assets = newLensedAtom<E.Either<string, Array<CoinCardData>>>(
                userStore.assets.get()
            );

            const setAssets = (data: E.Either<string, Array<CoinCardData>>) => {
                assets.set(data), userStore.setAssets(data);
            };

            const getAssetsEffect = pipe(
                waletRestService.getAssets(),
                tap(
                    flow(
                        either.map((assets) =>
                            assets.map((asset) => ({
                                ...asset,
                                ticker: asset.symbol,
                                coinAmount: asset.balance,
                                cost: asset.price,
                            }))
                        ),
                        setAssets
                    )
                )
            );
            return valueWithEffect.new(
                {
                    assets,
                },
                getAssetsEffect
            );
        }
);
