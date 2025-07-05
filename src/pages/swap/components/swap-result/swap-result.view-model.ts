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
import { ResultOptions } from './swap-result.component';

export interface SwapResult {
    isOpen: Property<boolean>;
    status: Property<SwapResultStatus>;
    subTitle: Property<string>;
    logos: Property<Array<string>>;
    onClose: () => void;
    resultOptions: Property<Array<ResultOptions>>;
}

export interface NewSwapResult {
    (): ValueWithEffect<SwapResult>;
}

export const newSwapResult = injectable(
    token('newSwapStore')<SwapStore>(),
    // token('swapService')<SwapRestService>(),
    (
        store
        //  swapService
    ): NewSwapResult =>
        () => {
            const subTitle = newLensedAtom('');
            const logos = newLensedAtom<Array<string>>([]);

            const onClose = () => {
                store.closeResultBottomSheet();
            };

            const viewEffect = pipe(
                store.swapAssets,
                fromProperty,
                tap((assets) => {
                    pipe(
                        assets,
                        E.map(
                            flow(
                                A.map((asset) => asset.assetName),
                                A.reduceWithIndex('', (i, acc, curr) => {
                                    if (i === 0) {
                                        return `${curr}`;
                                    } else {
                                        return `${acc} to ${curr}`;
                                    }
                                })
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
                    onClose,
                    resultOptions: store.resultSwapListInfo,
                    isOpen: store.resultBottomSheetIsOpen,
                    status: store.resultStatus,
                },
                viewEffect
            );
        }
);
