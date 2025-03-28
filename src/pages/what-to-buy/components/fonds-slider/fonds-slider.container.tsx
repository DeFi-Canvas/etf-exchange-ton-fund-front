import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import React, { memo } from 'react';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../sub-page/purchase/purchase.store';
import {
    FondsSlider,
    FondsSliderProps,
} from '@/components/fond-card/fond-slider/fond-slider.component';
import { FondCardProps } from '@/components/fond-card/fond-card.component';
import { useNavigate } from 'react-router-dom';
import { pipe } from 'fp-ts/lib/function';
import { I18NService } from '@/store/i18n/i18.store';

interface FondsSliderContainerProps
    extends Omit<FondsSliderProps, 'slidesData' | 'onClick'> {}

export const FondsSliderContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    token('i18n')<I18NService>(),

    (store, i18n) =>
        memo((props: FondsSliderContainerProps) => {
            const funds = useProperty(store.funds);
            const { Funds } = useProperty(i18n.WhatToBuy);
            //TODO: создать вм и перенести туда
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
                        texts: {
                            risk: Funds.card.risk,
                            forecast: Funds.card.forecast,
                            return: Funds.card.return,
                        },
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
