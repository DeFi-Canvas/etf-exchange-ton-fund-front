import { injectable, token } from '@injectable-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { SwapStore } from '../../swap.store';
import { Property } from '@frp-ts/core';
import { SwapResultStatus } from '../../swap.model';
import { newLensedAtom } from '@frp-ts/lens';
import { constant, flow, identity, pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { tap } from '@most/core';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';

export interface SwapResult {
    isOpen: Property<boolean>;
    status: Property<SwapResultStatus>;
    subTitle: Property<string>;
    logos: Property<Array<string>>;
    onClose: () => void;
}

export interface NewSwapResult {
    (): ValueWithEffect<SwapResult>;
}

export const newSwapResult = injectable(
    token('store')<SwapStore>(),
    (store): NewSwapResult =>
        () => {
            const subTitle = newLensedAtom('');
            const logos = newLensedAtom<Array<string>>([]);

            const viewEffect = pipe(
                store.swapAssets,
                fromProperty,
                tap((assets) => {
                    pipe(
                        assets,
                        E.map(
                            flow(
                                A.map((asset) => asset.assetName),
                                A.reduce('', (acc, curr) => `${acc} to ${curr}`)
                            )
                        ),
                        E.fold(constant(''), identity),
                        subTitle.set
                    );
                    pipe(
                        assets,
                        E.map(A.map((asset) => asset.imageSrc)),
                        E.fold(constant([]), identity),
                        logos.set
                    );
                })
            );

            return valueWithEffect.new(
                {
                    subTitle,
                    logos,
                    isOpen: store.resultBottomSheetIsOpen,
                    status: store.resultStatus,
                    onClose: store.closeResultBottomSheet,
                },
                viewEffect
            );
        }
);
