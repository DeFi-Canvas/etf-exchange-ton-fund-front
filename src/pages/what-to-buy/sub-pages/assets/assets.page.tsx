import {
    CoinCard,
    CoinCardProps,
} from '@/components/coin-card/coin-card.component';
import css from './assets.module.css';

import img from './temp-teser.png';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

const ASSETS_MOCK: Array<CoinCardProps> = [
    {
        logo: O.some(img),
        name: O.some('Tether USDT'),
        isStableCoin: true,
        ticker: O.some('USDT'),
        coinAmmount: O.some(277.89),
        cost: O.some(277.89),
        pnl: O.none,
    },
    {
        logo: O.some(img),
        name: O.some('Toncoin'),
        isStableCoin: false,
        ticker: O.some('TON'),
        coinAmmount: O.some(1253.03),
        cost: O.some(1253.03),
        pnl: O.some({
            side: 'PROFIT',
            currency: 'USD',
            ammount: 45.12,
            persent: 12,
        }),
    },
    {
        logo: O.some(img),
        name: O.some('Toncoin'),
        isStableCoin: false,
        ticker: O.some('TON1'),
        coinAmmount: O.some(1253.03),
        cost: O.some(1253.03),
        pnl: O.some({
            side: 'LOSE',
            currency: 'USD',
            ammount: 45.12,
            persent: 12,
        }),
    },

    {
        logo: O.none,
        name: O.none,
        isStableCoin: false,
        ticker: O.none,
        coinAmmount: O.none,
        cost: O.none,
        pnl: O.none,
    },
];

export const Assets = () => {
    return (
        <div className={css.wrap}>
            {ASSETS_MOCK.map((el) => (
                <CoinCard
                    key={pipe(
                        el.ticker,
                        O.getOrElse(() => '-')
                    )}
                    {...el}
                />
            ))}
        </div>
    );
};
