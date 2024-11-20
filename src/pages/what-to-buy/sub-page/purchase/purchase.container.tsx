import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import PurchasePage from './purchase.page';
import { newPurchaseViewModel } from './purchase.view-model';

export const PurchaseContainer = injectable(
    newPurchaseViewModel,
    (newPurchaseViewModel) => () => {
        const vm = useValueWithEffect(() => newPurchaseViewModel(), []);
        const fundData = useProperty(vm.fundData);
        const assets = useProperty(vm.assets);
        const selectedAssets = useProperty(vm.selectedAssets);
        const quantity = useProperty(vm.quantity);
        const totalAmount = useProperty(vm.totalAmount);
        return React.createElement(PurchasePage, {
            ...vm,
            fundData,
            assets,
            selectedAssets,
            quantity,
            totalAmount,
        });
    }
);
