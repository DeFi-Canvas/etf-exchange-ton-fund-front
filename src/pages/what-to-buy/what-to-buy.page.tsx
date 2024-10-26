import { Coins } from './components/coins-section/coins.component';
import { Balans } from './components/balans/balans.component';
import { NavBar } from './components/nav-bar/nav-bar.component';
import css from './what-to-buy.module.css';
export const WhatToBuyPage = () => {
    return (
        <div className={css.wrap}>
            <div className={css.content}>
                <Balans />
                <NavBar />
            </div>
            <Coins />
        </div>
    );
};
