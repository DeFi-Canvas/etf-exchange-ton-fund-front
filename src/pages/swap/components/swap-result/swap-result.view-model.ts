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
import { newSwapRestService, SwapRestService } from '@/API/swipe.service';

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
    newSwapRestService,
    // token('swapService')<SwapRestService>(),
    (store, swapService): NewSwapResult =>
        () => {
            const subTitle = newLensedAtom('');
            const logos = newLensedAtom<Array<string>>([]);

            const { evs, unsubscription } = swapService.getConnection();

            const onClose = () => {
                store.closeResultBottomSheet(), unsubscription();
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

            const EVSEvent = pipe(
                evs,
                tap((x) => {
                    console.log(x, 'EVSEvent');
                    // if (x) {
                    //     resultStatus.set('SUCCESS');
                    // }
                })
            );

            return valueWithEffect.new(
                {
                    subTitle,
                    logos,
                    onClose,
                    isOpen: store.resultBottomSheetIsOpen,
                    status: store.resultStatus,
                },
                viewEffect,
                EVSEvent
            );
        }
);
