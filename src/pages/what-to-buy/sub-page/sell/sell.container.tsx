import { injectable, provide, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { newPurchaseSellStore } from '../purchase/purchase.store';
import SellPage from './sell.page';
import { useParams } from 'react-router-dom';
import { UserStoreService } from '@/store/user.store';
import { CacheStore } from '@/store/cache/cahe.store';

export const SellContainer = injectable(
    token('userStore')<UserStoreService>(),
    CacheStore,
    useValueWithEffect,
    SellPage,
    (userStore, cacheStore, useValueWithEffect, SellPage) =>
        memo(() => {
            const { id } = useParams();
            const store = newPurchaseSellStore({
                userStore,
                cacheStore,
            });

            const purchaseStore = useValueWithEffect(() => store(id), []);
            const showBottomSheet = useProperty(
                purchaseStore.isShowBottomSheetFinishBoody
            );
            const isLoading = useProperty(purchaseStore.isLoading);

            return React.createElement(SellPage, {
                ...purchaseStore,
                showBottomSheet,
                isLoading,
            });
        })
);
