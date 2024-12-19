import { injectable, token } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { tap } from '@most/core';

export interface PurchaseSellFooterViewModel {
    isDisabled: Property<boolean>;
}

export interface NewPurchaseSellFooterViewModel {
    (): ValueWithEffect<PurchaseSellFooterViewModel>;
}
export const newPurchaseSellFooterViewModel = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store): NewPurchaseSellFooterViewModel =>
        () => {
            const isDisabled = newLensedAtom(true);

            const isDisabledEffect = pipe(
                store.quantity,
                fromProperty,
                tap((quantity) => isDisabled.set(quantity < 1))
            );

            return valueWithEffect.new({ isDisabled }, isDisabledEffect);
        }
);
