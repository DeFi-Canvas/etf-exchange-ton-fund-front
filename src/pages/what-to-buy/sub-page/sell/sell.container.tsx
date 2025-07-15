import { injectable, provide } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import SellPage from './sell.page';
import { useParams } from 'react-router-dom';

export const SellContainer = injectable(
    useValueWithEffect,
    provide(SellPage)<'purchaseStore'>(),
    newPurchaseSellStore,
    (useValueWithEffect, SellPage, newPurchaseSellStore) =>
        memo(() => {
            const { id } = useParams();

            const purchaseStore = useValueWithEffect(
                () => newPurchaseSellStore(id),
                []
            );
            const showBottomSheet = useProperty(
                purchaseStore.isShowBottomSheetFinishBoody
            );
            const isLoading = useProperty(purchaseStore.isLoading);
            const SellPageResolve = SellPage({
                purchaseStore,
            });

            return React.createElement(SellPageResolve, {
                ...purchaseStore,
                showBottomSheet,
                isLoading,
            });
        })
);
