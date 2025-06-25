import { newWaletRestService } from '@/API/whalet.service';
import { AssetBalance } from '@/instance/asset/asset.model';
import { PENDING, Error, EMPTY } from '@/store/errors/error-system';
import { ValueWithEffect, valueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { injectable, token } from '@injectable-ts/core';
import { chain, now, tap } from '@most/core';
import { constant, flow, pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { StormRestService } from '@/API/storm/storm.service';
import { createAdapter } from '@most/adapter';
import { fromProperty } from '@/utils/property.utils';

interface StormStore {
    asset: Property<E.Either<Error, AssetBalance>>;
    activeAction: Property<'DEPOSIT' | 'WITHDROW'>;
    setActiveAction: (a: 'DEPOSIT' | 'WITHDROW') => void;
    amount: Property<number | null>;
    requestFinish: Property<boolean>;
    isBottomSheetOpen: Property<boolean>;
    maxAvailable: Property<number | null>;
    handleMaxClick: () => void;
    setAmount: (a: number) => void;
    deposit: () => void;
    withdraw: () => void;
}

export interface NewStormStore {
    (): ValueWithEffect<StormStore>;
}

export const Store = injectable(
    newWaletRestService,
    StormRestService,
    (waletService, stormService): NewStormStore =>
        () => {
            const assets = newLensedAtom<E.Either<Error, AssetBalance[]>>(
                E.left(PENDING)
            );
            const asset = newLensedAtom<E.Either<Error, AssetBalance>>(
                E.left(PENDING)
            );
            const activeAction = newLensedAtom<'DEPOSIT' | 'WITHDROW'>(
                'DEPOSIT'
            );
            const amount = newLensedAtom<number | null>(null);
            const requestFinish = newLensedAtom(false);
            const isBottomSheetOpen = newLensedAtom(false);
            const maxAvailable = newLensedAtom<number | null>(null);

            const [deposit, depositEvent] = createAdapter<void>();
            const [withdraw, withdrawEvent] = createAdapter<void>();

            const handleMaxClick = () => {
                const currentAsset = asset.get();
                if (E.isRight(currentAsset)) {
                    amount.set(currentAsset.right.balance);
                }
            };

            const getAssetEffect = pipe(
                waletService.getAssets(),
                tap((assetsResponce) => {
                    assets.set(assetsResponce);
                    const newAssets = pipe(
                        assetsResponce,
                        E.chain(
                            flow(
                                A.findFirst((asset) => asset.ticker === 'USDT'),
                                E.fromOption(constant(EMPTY))
                            )
                        )
                    );
                    asset.set(newAssets);
                })
            );

            const depositEffect = pipe(
                depositEvent,
                chain(() => {
                    isBottomSheetOpen.set(true);
                    const amountToSend = amount.get();
                    if (amountToSend) {
                        return stormService.deposit({
                            amount: amountToSend,
                            ticker: 'USDT',
                        });
                    }
                    return now(E.left(EMPTY));
                }),
                tap(() => requestFinish.set(true))
            );

            const withdrawEffect = pipe(
                withdrawEvent,
                chain(() => {
                    isBottomSheetOpen.set(true);
                    const amountToSend = amount.get();
                    if (amountToSend) {
                        return stormService.withdrow({
                            amount: amountToSend,
                            ticker: 'USDT-LP',
                        });
                    }
                    return now(E.left(EMPTY));
                }),
                tap(() => requestFinish.set(true))
            );

            const activeActionChangeEffect = pipe(
                activeAction,
                fromProperty,
                tap((activeAction) => {
                    amount.set(null);
                    const ticker =
                        activeAction === 'DEPOSIT' ? 'USDT' : 'USDT-LP';
                    const newAssets = pipe(
                        assets.get(),
                        E.chain(
                            flow(
                                A.findFirst((asset) => asset.ticker === ticker),
                                E.fromOption(constant(EMPTY))
                            )
                        )
                    );
                    asset.set(newAssets);

                    if (E.isRight(newAssets)) {
                        maxAvailable.set(newAssets.right.balance);
                    }
                })
            );
            return valueWithEffect.new(
                {
                    asset,
                    activeAction,
                    amount,
                    deposit,
                    withdraw,
                    setAmount: amount.set,
                    setActiveAction: activeAction.set,
                    requestFinish,
                    isBottomSheetOpen,
                    handleMaxClick,
                    maxAvailable,
                },
                getAssetEffect,
                depositEffect,
                withdrawEffect,
                activeActionChangeEffect
            );
        }
);
export const newStormStore = injectable(
    newWaletRestService,
    StormRestService,
    () => Store({})
);

export const StormStore = token('stormStore')<NewStormStore>();
