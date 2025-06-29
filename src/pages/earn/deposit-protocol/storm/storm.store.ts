import { newWalletRestService } from '@/API/wallet.service';
import { AssetBalance } from '@/instance/asset/asset.model';
import { PENDING, Error, EMPTY } from '@/store/errors/error-system';
import { ValueWithEffect, valueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { injectable, token } from '@injectable-ts/core';
import { chain, map, now, tap } from '@most/core';
import { constant, flow, pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { StormRestService } from '@/API/storm/storm.service';
import { createAdapter } from '@most/adapter';
import { fromProperty } from '@/utils/property.utils';
import { AssetsRestService } from '@/API/assets/assets.service';

export type Action = 'DEPOSIT' | 'WITHDROW';

interface StormStore {
    asset: Property<E.Either<Error, AssetBalance>>;
    activeAction: Property<Action>;
    setActiveAction: (acrion: Action) => void;
    amount: Property<number | null>;
    requestFinish: Property<boolean>;
    isBottomSheetOpen: Property<boolean>;
    isActionButtonEnabled: Property<boolean>;
    maxAvailable: Property<number | null>;
    handleMaxClick: () => void;
    setAmount: (amount: number) => void;
    deposit: () => void;
    withdraw: () => void;
}

export interface NewStormStore {
    (): ValueWithEffect<StormStore>;
}

export const newStormStore = injectable(
    newWalletRestService,
    StormRestService,
    AssetsRestService,
    (waletService, stormService, assetsService): NewStormStore =>
        () => {
            const assets = newLensedAtom<E.Either<Error, AssetBalance[]>>(
                E.left(PENDING)
            );
            const asset = newLensedAtom<E.Either<Error, AssetBalance>>(
                E.left(PENDING)
            );
            const activeAction = newLensedAtom<Action>('DEPOSIT');
            const amount = newLensedAtom<number | null>(null);
            const requestFinish = newLensedAtom(false);
            const isBottomSheetOpen = newLensedAtom(false);
            const isActionButtonEnabled = newLensedAtom(true);

            const maxAvailable = newLensedAtom<number | null>(null);

            const [deposit, depositEvent] = createAdapter<void>();
            const [withdraw, withdrawEvent] = createAdapter<void>();

            const handleMaxClick = () => {
                const currentAsset = asset.get();
                if (E.isRight(currentAsset)) {
                    amount.set(currentAsset.right.balance);
                }
            };

            const getSinglAsset = (ticker: string) =>
                flow(
                    E.chain(
                        flow(
                            A.findFirst(
                                (asset: AssetBalance) => asset.ticker === ticker
                            ),
                            E.fromOption(constant(EMPTY))
                        )
                    )
                );
            const getUSDT = getSinglAsset('USDT');

            const setAssetUSDT = flow(
                tap(assets.set),
                map(getUSDT),
                tap(asset.set)
            );

            const getAssetEffect = pipe(waletService.getAssets(), setAssetUSDT);

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
                        return stormService.withdraw({
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
            const getUsdtFromAllAssets = () =>
                pipe(
                    assetsService.getAllAssets(),
                    setAssetUSDT,
                    tap(() => isActionButtonEnabled.set(false))
                );

            const setDefaultDataEffect = pipe(
                asset,
                fromProperty,
                chain((asset) => {
                    return pipe(
                        asset,
                        E.fold(
                            (err) =>
                                err === EMPTY
                                    ? getUsdtFromAllAssets()
                                    : now(E.left(PENDING)),
                            (a) => now(E.right(a))
                        )
                    );
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
                    isActionButtonEnabled,
                },
                getAssetEffect,
                depositEffect,
                withdrawEffect,
                activeActionChangeEffect,
                setDefaultDataEffect
            );
        }
);
export const NewStormStore = token('stormStore')<StormStore>();
