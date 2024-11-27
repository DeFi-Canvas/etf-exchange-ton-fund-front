import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './what-to-buy.module.css';
import cn from 'classnames';
import { Crumbs } from '@/components/crumbs/crumbs.component';
import { BoardOfInterest } from '@/components/board-of-interest/board-of-interest.component';
import { AssetsCard } from '@/components/assets-card/assets-card.component';

import src1 from './assets/imgs/kiril.png';
import src2 from './assets/imgs/nikitajpg.jpg';
import src3 from './assets/imgs/sameOne.jpg';
import src4 from './assets/imgs/sameThre.jpg';
import src5 from './assets/imgs/sameTwo.jpg';
import src6 from './assets/imgs/sergey.png';
import src7 from './assets/imgs/vladimer.jpg';

import src8 from './assets/imgs/bable.png';
import src9 from './assets/imgs/ballpng.png';
import src10 from './assets/imgs/crownpng.png';
import src11 from './assets/imgs/dimondpng.png';
import src12 from './assets/imgs/rocket.png';
import src13 from './assets/imgs/stone.png';
import src14 from './assets/imgs/vpng.png';
import { injectable } from '@injectable-ts/core';
import { FondsSliderContainer } from './components/fonds-slider/fonds-slider.container';
import { ArrowTopRightIcon } from '@/components/Icons/Icons';
import AppButton from '@/components/AppButton/AppButton';
import { memo, useState } from 'react';

const colorFolowCompany =
    'linear-gradient(180deg, #9D87FF 0%, #5B39F4 101.95%)';

interface NewsItemImageInterface {
    src: string;
    alt: string;
}
interface NewsItemInterface {
    id: number;
    image: NewsItemImageInterface | null;
    title: string;
    datePublishAt: string;
    readTimeMin: string;
}

export const WhatToBuyPage = injectable(
    FondsSliderContainer,
    (FondsSliderContainer) =>
        memo(() => {
            // TODO Это моки, нужно будет заменить на новости
            // datePublishAt Возможно нужно прогнать через либу, чтоб пришедшая дата конвертилась в нужную, без года
            // const newsList: NewsItemInterface[] = [
            //     {
            //         id: 1,
            //         image: null,
            //         title: 'Empowering Builders for Growth with TON Nest',
            //         datePublishAt: '4 Oct',
            //         readTimeMin: '7',
            //     },
            //     {
            //         id: 2,
            //         image: null,
            //         title: 'TON Foundation Collaborates with Leading DEX Curve Finance to Incubate a TON-Based Stable Swap Project',
            //         datePublishAt: '29 Sep',
            //         readTimeMin: '3',
            //     },
            //     {
            //         id: 3,
            //         image: null,
            //         title: 'TADA and TON Foundation Bring Web3 Ride-Hailing to Telegram',
            //         datePublishAt: '22 Sep',
            //         readTimeMin: '10',
            //     },
            //     {
            //         id: 4,
            //         image: {
            //             src: 'temp-news-item-cover.png',
            //             alt: 'News cover',
            //         },
            //         title: 'Empowering Builders for Growth with TON Nest',
            //         datePublishAt: '28 Sep',
            //         readTimeMin: '5',
            //     },
            // ];

            const [v, setV] = useState('');
            const change = (event) => {
                setV(event.currentTarget.value);
            }

            return (
                <div className={cn('app-container', css.wrap)}>
                    <span className={css.title}>What to buy</span>
                    <input type="text" value={v} onChange={change} />
                    <SerchInput placeholder={'Search'} theme={css.serch} />
                    {/* <div className={css.crumbs}>
                        <Crumbs title="Funds" />
                        <Crumbs title="Assets" />
                        <Crumbs title="Favorites" />
                    </div> */}
                    {/* <BoardOfInterest
                        backgroundColor={colorFolowCompany}
                        imgs={[src1, src2, src3, src4, src5, src6, src7]}
                        theme={css.folowCompany}
                        title="Follow the community"
                        subTitle="Reuse the best strategies"
                    /> */}
                    {/* <div className={css.sectionCard}>
                        <span className={css.sectionCardTitle}>
                            Investments for beginners
                        </span>
                        <FondsSliderContainer theme={css.swiper} />
                    </div> */}

                    {/* <BoardOfInterest
                        imgs={[src8, src9, src10, src11, src12, src13, src14]}
                        theme={css.topOfTheWeek}
                        title="Top of the week"
                        subTitle="Frequently purchased"
                    /> */}

                    {/* <section className={css.sectionCard}>
                        <h2 className={css.sectionCardTitle}>Trade Leaders</h2>
                        <div className={css.sectionCardContent}>
                            <div className={css.leadersCardTitle}>
                                <ArrowTopRightIcon />
                                Growth Leaders
                            </div>
                            <div className={css.leadersAssets}>
                                <AssetsCard
                                    img={src8}
                                    title={'TON'}
                                    subTitle={'Toncoin'}
                                    price={'$ 3'}
                                    priceText={'4'}
                                    pnl={{
                                        value: '+ 100 $ 100 %',
                                        status: 'UP',
                                    }}
                                    type="pnl"
                                />
                                <AssetsCard
                                    img={src8}
                                    title={'TON'}
                                    subTitle={'Toncoin'}
                                    price={'$ 3'}
                                    priceText={'4'}
                                    pnl={{
                                        value: '+ 100 $ 100 %',
                                        status: 'UP',
                                    }}
                                    type="pnl"
                                />
                                <AssetsCard
                                    img={src8}
                                    title={'TON'}
                                    subTitle={'Toncoin'}
                                    price={'$ 3'}
                                    priceText={'4'}
                                    pnl={{
                                        value: '+ 100 $ 100 %',
                                        status: 'UP',
                                    }}
                                    type="pnl"
                                />
                            </div>
                            <button
                                type="button"
                                className={css.leadersCardButtonShowAll}
                            >
                                View all 10
                            </button>
                        </div>
                    </section> */}

                    {/* <section className={css.sectionCard}>
                        <h2 className={css.sectionCardTitle}>News</h2>
                        <div className={css.sectionCardContent}>
                            <div className={css.newsList}>
                                {newsList.map((newsItem) => (
                                    <div
                                        key={newsItem.id}
                                        className={css.newsItem}
                                    >
                                        {newsItem.image && (
                                            <img
                                                className={css.newItemImage}
                                                src={newsItem.image.src}
                                                alt={newsItem.image.alt}
                                            />
                                        )}
                                        <div className={css.newsItemContent}>
                                            <div className={css.newsItemTitle}>
                                                {newsItem.title}
                                            </div>
                                            <div className={css.newsItemMeta}>
                                                <span>
                                                    {newsItem.datePublishAt}
                                                </span>
                                                <span
                                                    className={
                                                        css.newsItemMetaDot
                                                    }
                                                ></span>
                                                <span>
                                                    {newsItem.readTimeMin} min
                                                    read
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <AppButton
                            className={css.newsButtonLoadMore}
                            label="Load more"
                            type="secondary"
                        />
                    </section> */}
                </div>
            );
        })
);
