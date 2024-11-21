import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import PurchasePage from './purchase.page';
import { newPurchaseViewModel } from './purchase.view-model';

export const PurchaseContainer = injectable(
    newPurchaseViewModel,
    provide(PurchasePage)<'purchaseStore'>(),
    (newPurchaseViewModel, PurchasePage) => () => {
        const vm = useValueWithEffect(() => newPurchaseViewModel(), []);
        const fundData = useProperty(vm.fundData);
        const assets = useProperty(vm.assets);
        const showBottomSheet = useProperty(vm.isBottomPanel);
        const PurchasePageResolve = PurchasePage({ purchaseStore: vm });

        return React.createElement(PurchasePageResolve, {
            ...vm,
            fundData,
            assets,
            showBottomSheet,
            setShowBottomSheet: vm.setIsBottomPanel,
        });
    }
);
