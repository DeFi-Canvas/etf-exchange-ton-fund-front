import {
    // CoinCard,
    CoinCardProps,
} from '@/components/ui-kit/coin-card/coin-card.component';
import css from './funds.module.css';

import img from './temp-teser.png';
import * as O from 'fp-ts/Option';
// import { pipe } from 'fp-ts/lib/function';
import { EmptyScrean } from '../epty-screan/epty-screan.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FOUNDS_MOCK: Array<CoinCardProps> = [
    {
        logo: O.some(img),
        name: O.some('Tether USDT'),
        isStableCoin: true,
        ticker: O.some('USDT'),
        coinAmount: O.some(277.89),
        cost: O.some(277.89),
        pnl: O.none,
    },
    {
        logo: O.some(img),
        name: O.some('Toncoin ToncoinToncoinToncoin'),
        isStableCoin: true,

        ticker: O.some('TON'),
        coinAmount: O.some(1253.03),
        cost: O.some(1253.03),
        pnl: O.some({
            side: 'PROFIT',
            currency: 'USD',
            amount: 45.12,
            persent: 12,
        }),
    },
    {
        logo: O.some(img),
        name: O.some('Toncoin'),
        isStableCoin: true,
        ticker: O.some('TON1'),
        coinAmount: O.some(1253.03),
        cost: O.some(1253.03),
        pnl: O.some({
            side: 'LOSE',
            currency: 'USD',
            amount: 45.12,
            persent: 12,
        }),
    },

    {
        logo: O.none,
        name: O.none,
        isStableCoin: false,
        ticker: O.none,
        coinAmount: O.none,
        cost: O.none,
        pnl: O.none,
    },
];

// const FOUNDS_MOCK_EMPTY: Array<CoinCardProps> = [];

const emptyGif =
    'https://s3-alpha-sig.figma.com/img/ca5e/7cff/4b7ae459f92988b243bb283ae7c0a1a9?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nHc-iBhUQo-YVE6xB3-2uIL8EcO77Kos2lBlS6IzXStKwDcj07ssAWMxHon8aXvAnP3xXOuINcNP36sTJv02gV2LMMXBF8liQ9hLBKCrAFRldj5NSMDlxQOR1VqOOJxtCc2VexQ~EGRpauGc6BXrYrWpL-l4Zjefa0Q6Hu6r0iXPyIOujOvSpXVl4ywaX~Mm975O0pF43-jJkqJzm8OpxfwX70~db4IkRFQIUhC0lWlvdTGQODliE~-7faY5751s0986-HtKH0M0XmfQjBMjIS2xYyH4qShlFLbXa0HYMv2w9KWYohPALjZGp6n61udr6LHldnwgvigmZx3gWgzpOw__';

const emptyText = `You don't have any investments in funds right now. Get started by browsing through funds to discover opportunities.`;

export const Funds = () => {
    return <EmptyScrean emptyGif={emptyGif} text={emptyText} />;
    return (
        <div className={css.wrap}>
            {/* {FOUNDS_MOCK_EMPTY.map((el) => (
                <CoinCard
                    key={pipe(
                        el.ticker,
                        O.getOrElse(() => '-')
                    )}
                    {...el}
                />
            ))} */}
        </div>
    );
};

// const EmptyScrean = () => {
//     return (
//         <div className={css.wrapEmptyScrean}>
//             <img src={emptyGif} alt="nothig found" />
//             <p className={css.text}>
// You don't have any investments in funds right now. Get started
// by browsing through funds to discover opportunities.
//             </p>
//         </div>
//     );
// };
