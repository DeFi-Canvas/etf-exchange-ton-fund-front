import { injectable, provide } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newPurchaseSellStore } from '../purchase/purchase.view-model';
import SellPage from './sell.page';
import { useParams } from 'react-router-dom';

export const SellContainer = injectable(
    newPurchaseSellStore,
    provide(SellPage)<'purchaseStore'>(),
    (newPurchaseViewModel, SellPage) => () => {
        const { id } = useParams();

        const vm = useValueWithEffect(() => newPurchaseViewModel(id), []);
        const showBottomSheet = useProperty(vm.isShowBottomSheetFinishBoody);
        const isLoading = useProperty(vm.isLoading);
        const SellPageResolve = SellPage({ purchaseStore: vm });

        return React.createElement(SellPageResolve, {
            ...vm,
            showBottomSheet,
            isLoading,
        });
    }
);
