import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React, { memo } from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../sub-page/purchase/purchase.view-model';
import {
    FondsSlider,
    // FondsSlider,
    FondsSliderProps,
} from '@/components/fond-card/fond-slider/fond-slider.component';
import { FondCardProps } from '@/components/fond-card/fond-card.component';
import { useNavigate } from 'react-router-dom';
import { pipe } from 'fp-ts/lib/function';

interface FondsSliderContainerProps
    extends Omit<FondsSliderProps, 'slidesData' | 'onClick'> {}

export const FondsSliderContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) =>
        memo((props: FondsSliderContainerProps) => {
            //TODO: создать вм и перенести туда
            const funds = useProperty(store.funds);
            const slidesData: E.Either<
                string,
                Array<Omit<FondCardProps, 'onClick'>>
            > = pipe(
                funds,
                E.map((e) =>
                    e.map((e) => ({
                        id: e.id,
                        title: e.name,
                        description: e.description,
                    }))
                )
            );

            const navigate = useNavigate();

            return React.createElement(FondsSlider, {
                ...props,
                slidesData,
                onClick: (id) => {
                    navigate(`/what-to-buy/fund/${id}`);
                },
            });
        })
);
