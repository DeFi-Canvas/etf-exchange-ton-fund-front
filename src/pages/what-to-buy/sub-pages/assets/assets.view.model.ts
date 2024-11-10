import { injectable, token } from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as O from 'fp-ts/Option';
import { either } from 'fp-ts';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/rest-service';
import { newLensedAtom } from '@frp-ts/lens';
import { CoinCardProps } from '@/components/ui-kit/coin-card/coin-card.component';
import { UserStoreService } from '@/store/user.store';

export interface AssetsViewModel {
    assets: Property<O.Option<Array<CoinCardProps>>>;
}

export interface NewAssetsViewModel {
    (): ValueWithEffect<AssetsViewModel>;
}

export const newAssetsViewModel = injectable(
    token('userStore')<UserStoreService>(),
    newWaletRestService,
    (userStore, waletRestService): NewAssetsViewModel =>
        () => {
            const assets = newLensedAtom<O.Option<Array<CoinCardProps>>>(
                userStore.assets.get()
            );

            const setAssets = (data: O.Option<Array<CoinCardProps>>) => {
                assets.set(data), userStore.setAssets(data);
            };

            const getAssetsEffect = pipe(
                waletRestService.getAssets(),
                tap(
                    flow(
                        either.map((jettons) =>
                            jettons.map((jetton) => ({
                                logo: O.some(jetton.image),
                                name: O.some(jetton.name),
                                isStableCoin: false,
                                ticker: O.some(jetton.symbol),
                                coinAmount: O.some(jetton.balance),
                                cost: O.some(jetton.price),
                                pnl: O.none,
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
