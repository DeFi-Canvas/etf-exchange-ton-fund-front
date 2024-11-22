import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../sub-page/purchase/purchase.view-model';
import {
    FondsSlider,
    FondsSliderProps,
} from '@/components/fond-card/fond-slider/fond-slider.component';
import { FondCardProps } from '@/components/fond-card/fond-card.component';

interface FondsSliderContainerProps
    extends Omit<FondsSliderProps, 'slidesData'> {}

export const FondsSliderContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => (props: FondsSliderContainerProps) => {
        const funds = useProperty(store.funds);
        const currentFunds: Array<FondCardProps> = E.isRight(funds)
            ? funds.right.map((e) => ({
                  title: e.name,
                  description: e.description,
              }))
            : [];

        return React.createElement(FondsSlider, {
            ...props,
            slidesData: currentFunds,
        });
    }
);
