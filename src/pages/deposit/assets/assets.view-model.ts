import { injectable, token } from '@injectable-ts/core';

import { flow, pipe } from 'fp-ts/lib/function';
import { tap, map } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { WaletRestService } from '@/API/whalet.service';
import { newLensedAtom } from '@frp-ts/lens';
import { DepositRestService } from '@/API/deposit.service';
import { DepositAsset } from '../deposit.model';
import { AssetCodec } from '@/pages/whalet/wallet.model';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';
import { AssetBalance } from '@/instance/asset/asset.model';
import { Errors, PENDING } from '@/store/errors/erorr-systrm';

export type AssetsViewModelInit = 'deposit' | 'withdrow';

export interface AssetsViewModel {
    assets: Property<E.Either<Errors, Array<DepositAsset | AssetBalance>>>;
    handleClick: (asset: DepositAsset | AssetBalance) => void;
}

export interface NewAssetsViewModel {
    (type: AssetsViewModelInit): ValueWithEffect<AssetsViewModel>;
}

// TODO: зря объеденил в одну сущность надо разводить по разным
// или норм?
export const newAssetsViewModel = injectable(
    token('waletRestService')<WaletRestService>(),
    token('depositRestService')<DepositRestService>(),
    token('withdrowStore')<WithdrowStore>(),
    (waletRestService, newDepositRestService, store): NewAssetsViewModel =>
        (type) => {
            const assets = newLensedAtom<
                E.Either<Errors, Array<DepositAsset | AssetBalance>>
            >(E.left(PENDING));

            const currentAssets = (() => {
                switch (type) {
                    case 'withdrow':
                        return pipe(
                            waletRestService.getAssets(),
                            map((x) =>
                                pipe(
                                    x,
                                    E.map(
                                        A.filter(
                                            (asset) => asset.ticker === 'TON'
                                        )
                                    )
                                )
                            )
                        );
                    case 'deposit': {
                        return newDepositRestService.getDepositAssets();
                    }
                }
            })();

            const handleClick = (asset: DepositAsset | AssetBalance) => {
                const currentAssets = assets.get();
                if (AssetCodec.is(asset) && E.isRight(currentAssets)) {
                    const currentAsset = currentAssets.right.find(
                        (el) => el.name === asset.name
                    );
                    if (AssetCodec.is(currentAsset)) {
                        store.setAvailableBalance(currentAsset.balance);
                        store.setTickerPrice(currentAsset.price);
                        store.setSymbolLogo(currentAsset.imageUrl);
                    }
                }
            };

            const getAssetsEffect = pipe(currentAssets, tap(assets.set));

            return valueWithEffect.new(
                {
                    assets,
                    handleClick,
                },
                getAssetsEffect
            );
        }
);
