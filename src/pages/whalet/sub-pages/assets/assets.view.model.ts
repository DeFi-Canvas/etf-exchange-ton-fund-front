import { injectable, token } from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as O from 'fp-ts/Option';
import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/whalet.service';
import { newLensedAtom } from '@frp-ts/lens';
import { UserStoreService } from '@/store/user.store';
import { CoinCardData } from '@/components/assets-card/assets-card.model';

export interface AssetsViewModel {
    assets: Property<O.Option<Array<CoinCardData>>>;
}

export interface NewAssetsViewModel {
    (): ValueWithEffect<AssetsViewModel>;
}

export const newAssetsViewModel = injectable(
    token('userStore')<UserStoreService>(),
    newWaletRestService,
    (userStore, waletRestService): NewAssetsViewModel =>
        () => {
            const assets = newLensedAtom<O.Option<Array<CoinCardData>>>(
                userStore.assets.get()
            );

            const setAssets = (data: O.Option<Array<CoinCardData>>) => {
                assets.set(data), userStore.setAssets(data);
            };

            const getAssetsEffect = pipe(
                waletRestService.getAssets(),
                tap(
                    flow(
                        either.map((jettons) =>
                            jettons.map((jetton) => ({
                                logo: jetton.image_url,
                                name: jetton.name,
                                ticker: jetton.symbol,
                                coinAmount: jetton.balance,
                                cost: jetton.price,
                            }))
                        ),
                        O.fromEither,
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
