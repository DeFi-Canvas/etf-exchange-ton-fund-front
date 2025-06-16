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
import { Errors } from '@/store/errors/erorr-systrm';

export interface AssetsViewModel {
    assets: Property<E.Either<Errors, Array<CoinCardData>>>;
}

export interface NewAssetsViewModel {
    (): ValueWithEffect<AssetsViewModel>;
}

export const newAssetsViewModel = injectable(
    token('userStore')<UserStoreService>(),
    newWaletRestService,
    (userStore, waletRestService): NewAssetsViewModel =>
        () => {
            const assets = newLensedAtom<E.Either<Errors, Array<CoinCardData>>>(
                userStore.assets.get()
            );

            const setAssets = (data: E.Either<Errors, Array<CoinCardData>>) => {
                assets.set(data), userStore.setAssets(data);
            };

            const getAssetsEffect = pipe(
                waletRestService.getAssets(),
                tap(
                    flow(
                        either.map((assets) =>
                            assets.map((asset) => ({
                                ...asset,
                                logo: asset.imageUrl,
                                ticker: asset.ticker,
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
