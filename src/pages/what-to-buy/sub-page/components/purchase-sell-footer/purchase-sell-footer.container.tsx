import { injectable } from '@injectable-ts/core';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { newPurchaseSellFooterViewModel } from './purchase-sell-footer.view-model';
import PurchaseSellFooter, {
    PurchaseSellFooterProps,
} from './purchase-sell-footer.component';
import { useValueWithEffect } from '@/utils/run-view-model.utils';

interface PurchaseSellFooterContainerProps
    extends Omit<PurchaseSellFooterProps, 'isDisabled'> {}

export const PurchaseSellFooterContainer = injectable(
    newPurchaseSellFooterViewModel,
    (newPurchaseSellFooterViewModel) =>
        (props: PurchaseSellFooterContainerProps) => {
            const viewModel = useValueWithEffect(
                () => newPurchaseSellFooterViewModel(),
                []
            );

            const isDisabled = useProperty(viewModel.isDisabled);

            return React.createElement(PurchaseSellFooter, {
                ...props,
                isDisabled,
            });
        }
);
