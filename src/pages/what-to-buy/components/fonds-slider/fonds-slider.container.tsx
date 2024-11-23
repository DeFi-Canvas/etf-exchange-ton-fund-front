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
import { useNavigate } from 'react-router-dom';

interface FondsSliderContainerProps
    extends Omit<FondsSliderProps, 'slidesData' | 'onClick'> {}

export const FondsSliderContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => (props: FondsSliderContainerProps) => {
        const funds = useProperty(store.funds);
        const currentFunds: Array<Omit<FondCardProps, 'onClick'>> = E.isRight(
            funds
        )
            ? funds.right.map((e) => ({
                  id: e.id,
                  title: e.name,
                  description: e.description,
              }))
            : [];

        const navigate = useNavigate();

        return React.createElement(FondsSlider, {
            ...props,
            slidesData: currentFunds,
            onClick: (id) => {
                navigate(`/what-to-buy/fund/${id}`);
            },
        });
    }
);
