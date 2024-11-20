import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newPurchaseViewModel } from '../purchase/purchase.view-model';
import SellPage from './sell.page';

export const SellContainer = injectable(
    newPurchaseViewModel,
    provide(SellPage)<'purchaseStore'>(),
    (newPurchaseViewModel, SellPage) => () => {
        const vm = useValueWithEffect(() => newPurchaseViewModel(), []);
        const fundData = useProperty(vm.fundData);
        const assets = useProperty(vm.assets);
        const SellPageResolve = SellPage({ purchaseStore: vm });

        return React.createElement(SellPageResolve, {
            ...vm,
            fundData,
            assets,
        });
    }
);
