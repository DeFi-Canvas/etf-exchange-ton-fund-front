import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';
import { createAdapter } from '@most/adapter';
import { chain, combine, tap } from '@most/core';
import { pipe } from 'fp-ts/lib/function';
import {
    mapAssetToFiltrebleSwapAsset,
    getAssetsEffectMapping,
} from '../../swap.model';
import { newSwapRestService } from '@/API/swap.service';
import { newWaletRestService } from '@/API/whalet.service';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { newAssetsRestService } from '@/API/assets.service.ts';

export interface SwapHeader {
    onClick: () => void;
}

export interface NewSwapHeader {
    (): ValueWithEffect<SwapHeader>;
}

export const newSwapHeader = injectable(
    token('store')<SwapStore>(),
    newWaletRestService,
    newSwapRestService,
    (store, walletService, swapRestService): NewSwapHeader =>
        () => {
            const [onReset, onResetEvent] = createAdapter<void>();

            // TODO - будет рабоать иначе (переполучать стоимость ассетов и обновлять стоимость)
            const resetEffect = pipe(
                onResetEvent,
                chain(() =>
                    combine(
                        (assets, walletAssets) => ({
                            assets,
                            walletAssets,
                        }),
                        swapRestService.getAssets(),
                        walletService.getAssets()
                    )
                ),
                tap(({ assets, walletAssets: waletAssetsResp }) => {
                    pipe(
                        assets,
                        E.map(A.map(mapAssetToFiltrebleSwapAsset)),
                        store.setAllAssets
                    );
                    store.setWaletAssets(waletAssetsResp);

                    getAssetsEffectMapping(
                        assets,
                        store.getWaletAssets(),
                        store.setSwapAssets
                    );
                })
            );
            return valueWithEffect.new(
                {
                    onClick: onReset,
                },
                resetEffect
            );
        }
);
