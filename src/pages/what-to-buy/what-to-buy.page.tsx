import { injectable } from '@injectable-ts/core';
import { BalanceContainer } from './components/balans/balans.container';
import { Coins } from './components/coins-section/coins.component';
import { NavBar } from './components/nav-bar/nav-bar.component';
import * as O from 'fp-ts/Option';

import css from './what-to-buy.module.css';

export interface WhatToBuyPageProps {
    balance: O.Option<number>;
}
export const WhatToBuyPage = injectable(
    BalanceContainer,
    // eslint-disable-next-line react/display-name
    (BalanceContainer) => () => {
        return (
            <div className={css.wrap}>
                <div className={css.content}>
                    <BalanceContainer />
                    <NavBar />
                </div>
                <Coins />
            </div>
        );
    }
);
