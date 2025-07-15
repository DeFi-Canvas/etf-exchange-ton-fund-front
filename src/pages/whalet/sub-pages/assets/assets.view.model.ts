import { injectable } from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWalletRestService } from '@/API/wallet/wallet.service';
import { newLensedAtom } from '@frp-ts/lens';
import { CoinCardData } from '@/components/assets-card/assets-card.model';
import { Error } from '@/store/errors/error-system';

export interface AssetsViewModel {
    assets: Property<E.Either<Error, Array<CoinCardData>>>;
}

export interface NewAssetsViewModel {
    (): ValueWithEffect<AssetsViewModel>;
}

export const newAssetsViewModel = injectable(
    newWalletRestService,
    (waletRestService): NewAssetsViewModel =>
        () => {
            const assets = newLensedAtom<E.Either<Error, Array<CoinCardData>>>(
                E.left('PENDING')
            );

            const setAssets = (data: E.Either<Error, Array<CoinCardData>>) => {
                assets.set(data);
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
