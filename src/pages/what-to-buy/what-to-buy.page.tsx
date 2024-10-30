import { Coins } from './components/coins-section/coins.component';
import { Balans } from './components/balans/balans.component';
import { NavBar } from './components/nav-bar/nav-bar.component';
import * as O from 'fp-ts/Option';

import css from './what-to-buy.module.css';

export interface WhatToBuyPageProps {
    balance: O.Option<number>;
}
export const WhatToBuyPage = ({ balance }: WhatToBuyPageProps) => {
    return (
        <div className={css.wrap}>
            <div className={css.content}>
                <Balans balance={balance} />
                <NavBar />
            </div>
            <Coins />
        </div>
    );
};
