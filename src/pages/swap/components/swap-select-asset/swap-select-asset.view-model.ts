import { injectable, token } from '@injectable-ts/core';

import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';
import { Property } from '@frp-ts/core';
import { AssetsUI } from '@/components/assets-card/assets-card.model';
import { flow, pipe } from 'fp-ts/lib/function';
import { AssetsUIFiltreble, mapAssetsWaletToCard } from '../../swap.model';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { fromProperty } from '@/utils/property.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { combine, map, tap } from '@most/core';

export interface SwapSelectAsset {
    avlailibleAssets: Property<E.Either<string, AssetsUIFiltreble[]>>;
    isOpen: Property<boolean>;
    onSelectAsset: (assetId: string) => void;
    onSearchAssets: (ticker: string) => void;
    closeBottomSheet: () => void;
}

export interface NewSwapSelectAsset {
    (): ValueWithEffect<SwapSelectAsset>;
}

export const newSwapSelectAsset = injectable(
    token('store')<SwapStore>(),
    (store): NewSwapSelectAsset =>
        () => {
            const avlailibleAssets = newLensedAtom<
                E.Either<string, AssetsUIFiltreble[]>
            >(E.left('pending'));
            const isOpen = newLensedAtom(false);

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

            const isOpenEffect = pipe(
                combine(
                    (selectState, addState) => ({ selectState, addState }),
                    pipe(store.selectAssetBottomSheetIsOpen, fromProperty),
                    pipe(store.addAssetBottomSheetIsOpen, fromProperty)
                ),
                map(({ selectState, addState }) => selectState || addState),
                tap(isOpen.set)
            );

            const onSelectAsset = (id: string) => {
                if (store.addAssetBottomSheetIsOpen.get()) {
                    store.setAddCurrentVariableAsset(id);
                } else {
                    store.setCurrentVariableAsset(id);
                }
            };

            return valueWithEffect.new(
                {
                    avlailibleAssets,
                    isOpen,
                    onSelectAsset,
                    closeBottomSheet: () =>
                        store.setSelectAssetBottomSheetIsOpen(false),
                    onSearchAssets: store.onSearchAssets,
                },
                avlailibleAssetsEffect,
                isOpenEffect
            );
        }
);
