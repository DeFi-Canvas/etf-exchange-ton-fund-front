import { injectable, token } from '@injectable-ts/core';

import { pipe } from 'fp-ts/lib/function';
import { empty, tap } from '@most/core';
import { Property } from '@frp-ts/core';
import * as E from 'fp-ts/Either';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newWaletRestService } from '@/API/whalet.service';
import { newLensedAtom } from '@frp-ts/lens';
import { newDepositRestService } from '@/API/deposit.service';
import { DepositAssets } from '../deposit.model';
import { Asset, AssetCodec } from '@/pages/whalet/whalet.model';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';

export type AssetsViewModelInit = 'deposit' | 'withdrow';
export interface AssetsViewModel {
    assets: Property<
        E.Either<string | 'pending', Array<DepositAssets | Asset>>
    >;
    handleClick: (asset: DepositAssets | Asset) => void;
}

export interface NewAssetsViewModel {
    (type: AssetsViewModelInit): ValueWithEffect<AssetsViewModel>;
}

// TODO: зря объеденил в одну сущность надо разводить по разным
export const newAssetsViewModel = injectable(
    newWaletRestService,
    newDepositRestService,
    token('withdrowStore')<WithdrowStore>(),
    (waletRestService, newDepositRestService, store): NewAssetsViewModel =>
        (type) => {
            const assets = newLensedAtom<
                E.Either<string | 'pending', Array<DepositAssets | Asset>>
            >(E.left('pending'));

            const currentAssets = (() => {
                switch (type) {
                    case 'withdrow':
                        return waletRestService.getAssets();
                    case 'deposit': {
                        return newDepositRestService.getDepositAssets();
                    }
                    default: {
                        return empty();
                    }
                }
            })();

            const handleClick = (asset: DepositAssets | Asset) => {
                const currentAssets = assets.get();
                if (AssetCodec.is(asset) && E.isRight(currentAssets)) {
                    const currentAsset = currentAssets.right.find(
                        (el) => el.name === asset.name
                    );
                    if (AssetCodec.is(currentAsset)) {
                        store.setAvailableBalance(currentAsset.balance);
                        store.setTickerPrice(currentAsset.price);
                        store.setSymbolLogo(currentAsset.image_url);
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
