import { injectable } from '@injectable-ts/core';
import { BalanceContainer } from './components/balans/balans.container';
import { Coins } from './components/coins-section/coins.component';
import { NavBar } from './components/nav-bar/nav-bar.component';
import * as O from 'fp-ts/Option';

import css from './what-to-buy.module.css';
import { NewsEarn } from './components/news/news-earn.component';
import { LernMore } from './components/news/lern-more.component';

//
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export interface WhatToBuyPageProps {
    balance: O.Option<number>;
}
export const WaletPage = injectable(
    BalanceContainer,
    // eslint-disable-next-line react/display-name
    (BalanceContainer) => () => {
        return (
            <div className={css.wrap}>
                <div className={css.content}>
                    <BalanceContainer />
                    <NavBar />
                    <Swiper className={css.swiperWrap}>
                        <SwiperSlide>
                            <NewsEarn />
                        </SwiperSlide>
                        <SwiperSlide>
                            <LernMore />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <Coins />
            </div>
        );
    }
);
