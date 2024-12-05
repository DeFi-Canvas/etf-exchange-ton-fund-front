import { injectable, token } from '@injectable-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import { property, Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { tap } from '@most/core';

export interface PurchaseSellFieldCounterViewModel {
    isMinusDisabled: Property<boolean>;
    isPlusDisabled: Property<boolean>;
}

export interface NewPurchaseSellFieldCounterViewModel {
    (): ValueWithEffect<PurchaseSellFieldCounterViewModel>;
}
export const newPurchaseSellFieldCounterViewModel = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store): NewPurchaseSellFieldCounterViewModel =>
        () => {
            const isMinusDisabled = newLensedAtom(true);
            const isPlusDisabled = newLensedAtom(false);

            const isButtonsDisabledEffect = pipe(
                property.combine(
                    store.quantity,
                    store.maxAvailableBuy,
                    (quantity, maxAvailableBuy) => ({
                        quantity,
                        maxAvailableBuy,
                    })
                ),
                fromProperty,
                tap(({ quantity, maxAvailableBuy }) => {
                    isMinusDisabled.set(false);
                    isPlusDisabled.set(false);
                    if (quantity < 1) {
                        isMinusDisabled.set(true);
                    }
                    if (quantity + 1 > maxAvailableBuy) {
                        isPlusDisabled.set(true);
                    }
                })
            );

            return valueWithEffect.new(
                { isMinusDisabled, isPlusDisabled },
                isButtonsDisabledEffect
            );
        }
);
