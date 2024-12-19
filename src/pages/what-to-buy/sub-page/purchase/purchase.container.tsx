import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import PurchasePage from './purchase.page';
import { newPurchaseSellStore } from './purchase.store';
import { useParams } from 'react-router-dom';
import { UserStoreService } from '@/store/user.store';

export const PurchaseContainer = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) => () => {
        const { id } = useParams();

        const store = newPurchaseSellStore({ userStore });

        const purchaseStore = useValueWithEffect(() => store(id), []);
        const showBottomSheet = useProperty(purchaseStore.isBottomPanel);
        const isShowBottomSheetFinishBoody = useProperty(
            purchaseStore.isShowBottomSheetFinishBoody
        );
        const isLoading = useProperty(purchaseStore.isLoading);

        const PurchasePageResolve = PurchasePage({ purchaseStore });

        return React.createElement(PurchasePageResolve, {
            ...purchaseStore,
            showBottomSheet,
            setShowBottomSheet: purchaseStore.setIsBottomPanel,
            isShowBottomSheetFinishBoody,
            isLoading,
        });
    }
);
