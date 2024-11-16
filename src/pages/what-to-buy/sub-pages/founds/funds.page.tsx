import { CoinCardProps } from '@/components/ui-kit/coin-card/coin-card.component';
import css from './funds.module.css';

import img from './temp-teser.png';
import * as O from 'fp-ts/Option';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/money_duck.gif';
import AppButton from '@/components/AppButton/AppButton';

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

const emptyText = `You don't have any investments in funds right now. Get started by browsing through funds to discover opportunities.`;

export const Funds = () => {
    const footerSlot = () => (
        <div className={css.footerButtons}>
            <AppButton to={'/deposit'} label="Deposit" type="secondary" />
            <AppButton label="Choose a fund" />
        </div>
    );

    return (
        <EmptyScrean
            footerSlot={footerSlot}
            emptyGif={emptyGif}
            text={emptyText}
        />
    );
    // return (
    //     <div className={css.wrap}>
    //         {/* {FOUNDS_MOCK_EMPTY.map((el) => (
    //             <CoinCard
    //                 key={pipe(
    //                     el.ticker,
    //                     O.getOrElse(() => '-')
    //                 )}
    //                 {...el}
    //             />
    //         ))} */}
    //     </div>
    // );
};
