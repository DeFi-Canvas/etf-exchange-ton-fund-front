import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwipeStore } from '../../swap.store';
import { Property } from '@frp-ts/core';
import { Assets } from '@/components/assets-card/assets-card.model';
import { flow, pipe } from 'fp-ts/lib/function';
import { mapAssetsWaletToCard } from '../../swap.model';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { fromProperty } from '@/utils/property.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { tap } from '@most/core';

export interface SwapSelectAsset {
    avlailibleAssets: Property<E.Either<string, Assets[]>>;
    isOpen: Property<boolean>;
    onSelectAsset: (assetId: string) => void;
    closeBottomSheet: () => void;
}

export interface NewSwapSelectAsset {
    (): ValueWithEffect<SwapSelectAsset>;
}

export const newSwapSelectAsset = injectable(
    token('store')<SwipeStore>(),
    (store): NewSwapSelectAsset =>
        () => {
            const avlailibleAssets = newLensedAtom<E.Either<string, Assets[]>>(
                E.left('pending')
            );

            const avlailibleAssetsEffect = pipe(
                store.allAssets,
                fromProperty,
                tap(
                    flow(
                        E.map(A.map(mapAssetsWaletToCard)),
                        avlailibleAssets.set
                    )
                )
            );

            return valueWithEffect.new(
                {
                    avlailibleAssets,
                    isOpen: store.selectAssetBottomSheetIsOpen,
                    onSelectAsset: store.setCurrentVariableAsset,
                    closeBottomSheet: store.onCloseselectAssetBottomSheetIsOpen,
                },
                avlailibleAssetsEffect
            );
        }
);
