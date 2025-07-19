import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import React from 'react';
import { useProperties } from '@frp-ts/react';
import PurchaseSellContentCard from './purchase-sell-content-card.component';
import { PageType } from '@/pages/what-to-buy/what-to-buy.model';
import { newPurchaseSellContentCardViewModel } from './purchase-sell-content-card.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

interface PurchaseSellContentCardContainerProps {
    type: PageType;
}

export const PurchaseSellContentCardContainer = injectable(
    useValueWithEffect,
    token('purchaseStore')<PurchaseSellStore>(),
    PurchaseSellContentCard,
    newPurchaseSellContentCardViewModel,
    (
        useValueWithEffect,
        store,
        PurchaseSellContentCard,
        newPurchaseSellContentCardViewModel
    ) =>
        ({ type }: PurchaseSellContentCardContainerProps) => {
            const vm = useValueWithEffect(
                () => newPurchaseSellContentCardViewModel(type),
                []
            );

            const [totalAmount] = useProperties(store.totalAmount);

            const [maxAvailable, assetCardData, assetName] = useProperties(
                vm.maxAvailable,
                vm.assetCardData,
                vm.assetName
            );

            return React.createElement(PurchaseSellContentCard, {
                ...store,
                ...vm,
                totalAmount,
                maxAvailable,
                assetName,
                assetCardData,
            });
        }
);
