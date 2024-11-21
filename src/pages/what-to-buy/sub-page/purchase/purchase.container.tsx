import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import PurchasePage from './purchase.page';
import { newPurchaseSellStore } from './purchase.view-model';

export const PurchaseContainer = injectable(
    newPurchaseSellStore,
    provide(PurchasePage)<'purchaseStore'>(),
    (newPurchaseSellStore, PurchasePage) => () => {
        const store = useValueWithEffect(() => newPurchaseSellStore(), []);
        const showBottomSheet = useProperty(store.isBottomPanel);
        const PurchasePageResolve = PurchasePage({ purchaseStore: store });

        return React.createElement(PurchasePageResolve, {
            ...store,
            showBottomSheet,
            setShowBottomSheet: store.setIsBottomPanel,
        });
    }
);
