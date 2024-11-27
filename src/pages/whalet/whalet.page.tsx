import { injectable } from '@injectable-ts/core';
import { BalanceContainer } from './components/balans/balans.container';
import { Coins } from './components/coins-section/coins.component';
import { NavBar } from './components/nav-bar/nav-bar.component';
import * as O from 'fp-ts/Option';

import css from './whalet.module.css';
import { NewsEarn } from './components/news/news-earn.component';
import { LernMore } from './components/news/lern-more.component';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useState } from 'react';
import * as E from 'fp-ts/Either';


export interface WhatToBuyPageProps {
    balance: O.Option<number>;
}
export const WaletPage = injectable(
    BalanceContainer,
    (BalanceContainer) => () => {
        const swiperOptions = {
            spaceBetween: 10,
            slidesPerView: 1.05,
            className: css.swiperWrap,
        };

        const [currentMemo, setCurrentMemo] = useState('');

        const memoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.currentTarget.value;
            setCurrentMemo(val);
        };

        const [val, setVal] = useState('0');
        const changeInp = (event: React.ChangeEvent<HTMLInputElement>) => {
            setVal(event.currentTarget.value);
        }

        return (
            <div className={css.application}>
                <header className={css.header}>
                    <input 
                        type="text"
                        value={val}
                        onChange={changeInp}
                    />
                   
                    <input
                        placeholder="Enter"
                        value={currentMemo}
                        onChange={memoOnChange}
                    />

                    <BalanceContainer />
                    <NavBar />
                    <Swiper {...swiperOptions}>
                        <SwiperSlide>
                            <NewsEarn />
                        </SwiperSlide>
                        <SwiperSlide>
                            <LernMore />
                        </SwiperSlide>
                    </Swiper>
                </header>
                <div className={css.coinWrapper}>
                    <Coins />
                </div>
            </div>
        );
    }
);
