import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import {
    CoinCard,
    CoinCardProps,
} from '@/components/ui-kit/coin-card/coin-card.component';
import css from './deposit.module.css';
import img from './temp-teser.png';
import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';

const DEPOSIT_MOCK: Array<CoinCardProps> = [
    {
        logo: O.some(img),
        name: O.some('Tether USDT'),
        isStableCoin: true,
        ticker: O.some('USDT'),
        coinAmmount: O.some(277.89),
        cost: O.none,
        pnl: O.none,
        type: 'secondory',
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
        type: 'secondory',
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
        type: 'secondory',
    },

    {
        logo: O.none,
        name: O.none,
        isStableCoin: false,
        ticker: O.none,
        coinAmmount: O.none,
        cost: O.none,
        pnl: O.none,
        type: 'secondory',
    },
];
export const DepositPage = () => {
    return (
        <>
            <div className={css.wrap}>
                <h2>Deposit</h2>
                <SerchInput placeholder="Search" />
            </div>
            <div className={css.coinCards}>
                {DEPOSIT_MOCK.map((el) => (
                    <CoinCard
                        key={pipe(
                            el.ticker,
                            O.getOrElse(() => '-')
                        )}
                        {...el}
                    />
                ))}
            </div>
        </>
    );
};
