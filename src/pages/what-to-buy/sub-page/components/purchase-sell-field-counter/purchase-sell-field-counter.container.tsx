import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellStore } from '../../purchase/purchase.view-model';
import React from 'react';
import PurchaseSellFieldCounter from './purchase-sell-field-counter.component';
import { useProperty } from '@frp-ts/react';
import { newPurchaseSellFieldCounterViewModel } from './purchase-sell-field-counter.view-model';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

export const PurchaseSellFieldCounterContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    newPurchaseSellFieldCounterViewModel,
    (store, newPurchaseSellFieldCounterViewModel) => () => {
        const quantity = useProperty(store.quantity);
        const viewModel = useValueWithEffect(
            () => newPurchaseSellFieldCounterViewModel(),
            []
        );

        const isButtomMinusDisabled = useProperty(viewModel.isMinusDisabled);
        const isButtomPlusDisabled = useProperty(viewModel.isPlusDisabled);
        return React.createElement(PurchaseSellFieldCounter, {
            ...store,
            quantity,
            isButtomMinusDisabled,
            isButtomPlusDisabled,
        });
    }
);
