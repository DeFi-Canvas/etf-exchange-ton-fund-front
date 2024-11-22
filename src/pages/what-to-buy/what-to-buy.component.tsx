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

const colorFolowCompany =
    'linear-gradient(180deg, #9D87FF 0%, #5B39F4 101.95%)';

export const WhatToBuyPage = injectable(
    FondsSliderContainer,
    (FondsSliderContainer) => () => {
        return (
            <div className={cn('app-container', css.wrap)}>
                <span className={css.title}>What to buy</span>
                <SerchInput placeholder={'Search'} theme={css.serch} />
                <div className={css.crumbs}>
                    <Crumbs title="Funds" />
                    <Crumbs title="Assets" />
                    <Crumbs title="Favorites" />
                </div>
                <BoardOfInterest
                    backgroundColor={colorFolowCompany}
                    imgs={[src1, src2, src3, src4, src5, src6, src7]}
                    theme={css.folowCompany}
                    title="Follow the community"
                    subTitle="Reuse the best strategies"
                />
                <div>
                    <span className={css.h2}>Investments for beginners</span>
                    <FondsSliderContainer theme={css.swiper} />
                </div>

                <BoardOfInterest
                    imgs={[src8, src9, src10, src11, src12, src13, src14]}
                    theme={css.topOfTheWeek}
                    title="Top of the week"
                    subTitle="Frequently purchased"
                />

                <span className={css.h2}>Trade Leaders</span>
                <div className={css.leadersWrap}>
                    <span className={css.leadersWrapTitle}>Growth Leaders</span>
                    <div className={css.leadersAssets}>
                        <AssetsCard
                            img={src8}
                            title={'TON'}
                            subTitle={'Toncoin'}
                            price={'$ 3'}
                            priceText={'4'}
                            pnl={{ value: '+ 100 $ 100 %', status: 'UP' }}
                            type="pnl"
                        />
                        <AssetsCard
                            img={src8}
                            title={'TON'}
                            subTitle={'Toncoin'}
                            price={'$ 3'}
                            priceText={'4'}
                            pnl={{ value: '+ 100 $ 100 %', status: 'UP' }}
                            type="pnl"
                        />
                        <AssetsCard
                            img={src8}
                            title={'TON'}
                            subTitle={'Toncoin'}
                            price={'$ 3'}
                            priceText={'4'}
                            pnl={{ value: '+ 100 $ 100 %', status: 'UP' }}
                            type="pnl"
                        />
                    </div>
                </div>
            </div>
        );
    }
);
