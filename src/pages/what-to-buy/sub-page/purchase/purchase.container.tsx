import { injectable, token } from '@injectable-ts/core';
import React, { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import PurchasePage from './purchase.page';
import { newPurchaseSellStore } from './purchase.store';
import { useParams } from 'react-router-dom';
import { UserStoreService } from '@/store/user.store';
import { CacheStore } from '@/store/cache/cahe.store';

export const PurchaseContainer = injectable(
    token('userStore')<UserStoreService>(),
    CacheStore,
    useValueWithEffect,
    PurchasePage,
    (userStore, cacheStore, useValueWithEffect, PurchasePage) =>
        memo(() => {
            const { id } = useParams();

            const purchaseStore = useValueWithEffect(
                () =>
                    newPurchaseSellStore({
                        userStore,
                        cacheStore,
                    })(id),
                []
            );

            const showBottomSheet = useProperty(purchaseStore.isBottomPanel);
            const isShowBottomSheetFinishBoody = useProperty(
                purchaseStore.isShowBottomSheetFinishBoody
            );
            const isLoading = useProperty(purchaseStore.isLoading);

            return React.createElement(PurchasePage, {
                ...purchaseStore,
                showBottomSheet,
                setShowBottomSheet: purchaseStore.setIsBottomPanel,
                isShowBottomSheetFinishBoody,
                isLoading,
            });
        })
);
