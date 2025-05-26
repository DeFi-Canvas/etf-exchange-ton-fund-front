import { injectable, token } from '@injectable-ts/core';
import { BalanceContainer } from './components/balans/balans.container';
import { OperationsNavContainer } from './components/coins-section/coins.component';
import { NavBar } from './components/nav-bar/nav-bar.component';
import * as O from 'fp-ts/Option';

import css from './wallet.module.css';
import { NewsEarn } from './components/news/news-earn.component';
import { LernMore } from './components/news/lern-more.component';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Onboarding } from '@/components/onboarding/onboarding.component.tsx';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';
import { AiAgent } from './components/news/ai-agent.component';

export interface WhatToBuyPageProps {
    balance: O.Option<number>;
}

const swiperOptions = {
    spaceBetween: 20,
    slidesPerView: 1.05,
    className: css.swiperWrap,
};

export const WaletPage = injectable(
    BalanceContainer,
    OperationsNavContainer,
    token('i18n')<I18NService>(),
    (BalanceContainer, OperationsNavContainer, i18n) => () => {
        const isOnboardingShown = localStorage.getItem('isOnboardingShown');
        const texts = useProperty(i18n.Wallet);

        return (
            <div className={css.application}>
                <header className={css.header}>
                    <BalanceContainer />
                    <NavBar texts={texts} />
                    <Swiper {...swiperOptions}>
                        <SwiperSlide>
                            <AiAgent {...texts.swiper.lernMore} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewsEarn {...texts.swiper.news} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <LernMore {...texts.swiper.lernMore} />
                        </SwiperSlide>
                    </Swiper>
                </header>
                <div className={css.coinWrapper}>
                    <OperationsNavContainer />
                </div>
                {isOnboardingShown === null && <Onboarding />}
            </div>
        );
    }
);
