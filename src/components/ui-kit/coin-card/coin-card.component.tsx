import { formatNumberToUI } from '@/utils/number';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/lib/Apply';
import { OptionSpan } from '../fpts-components-utils/options.component';

import cn from 'classnames';
import css from './coin-card.module.css';

export interface CoinCardProps {
    logo: O.Option<string>;
    name: O.Option<string>;
    isStableCoin: boolean;
    ticker: O.Option<string>;
    coinAmmount: O.Option<number>;
    cost: O.Option<number>;
    pnl: O.Option<{
        ammount: number;
        currency: string;
        side: 'PROFIT' | 'LOSE';
        persent: number;
    }>;
    type?: 'primary' | 'secondory';
}

export const CoinCard = ({
    logo,
    name,
    isStableCoin = false,
    ticker,
    coinAmmount,
    cost,
    pnl,
    type = 'primary',
}: CoinCardProps) => {
    const CoinLogo = () =>
        pipe(
            logo,
            O.map((src) => {
                // eslint-disable-next-line react/jsx-key
                return <img src={src} className={css.img} />;
            }),
            O.getOrElse(() => <span> - </span>)
        );

    const isLosePosition = pipe(
        pnl,
        O.map((pnl) => pnl.side),
        O.fold(
            () => true,
            (side) => side === 'LOSE'
        )
    );

    const isPnLExists = pipe(pnl, O.isSome);

    const dataAvailible = pipe(
        { logo, name, ticker, coinAmmount },
        A.sequenceS(O.Applicative),
        O.match(
            () => false,
            () => true
        )
    );

    if (!dataAvailible) {
        return null;
    }

    return (
        <div className={css.wrap}>
            <CoinLogo />
            <CoinInfo
                isStableCoin={isStableCoin}
                coinAmmount={coinAmmount}
                name={name}
                ticker={ticker}
                type={type}
            />
            {type === 'primary' && (
                <div className={css.money}>
                    <OptionSpan
                        modificator="$"
                        data={pipe(
                            cost,
                            O.map(formatNumberToUI),
                            O.map((cost) => `${cost}`)
                        )}
                    />
                    {isPnLExists && (
                        <div className={cn(css.pnl)}>
                            <OptionSpan
                                className={cn({
                                    [css.lose]: isLosePosition,
                                    [css.profit]: !isLosePosition,
                                })}
                                modificator={pipe(
                                    pnl,
                                    O.map((pnl) => pnl.side),
                                    O.fold(
                                        () => '-',
                                        (side) => (side === 'LOSE' ? '-' : '+')
                                    )
                                )}
                                data={pipe(
                                    pnl,
                                    O.map(
                                        (pnl) =>
                                            `${pnl.ammount} ${pnl.currency} `
                                    )
                                )}
                            />
                            <div
                                className={cn(css.dot, {
                                    [css.lose]: isLosePosition,
                                    [css.profit]: !isLosePosition,
                                })}
                            />
                            <OptionSpan
                                className={cn({
                                    [css.lose]: isLosePosition,
                                    [css.profit]: !isLosePosition,
                                })}
                                data={pipe(
                                    pnl,
                                    O.map(({ persent }) => `${persent} % `)
                                )}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

interface CoinInfoProps
    extends Pick<
        CoinCardProps,
        'isStableCoin' | 'coinAmmount' | 'name' | 'ticker' | 'type'
    > {}

const CoinInfo = ({
    isStableCoin,
    coinAmmount,
    name,
    ticker,
    type = 'primary',
}: CoinInfoProps) => {
    if (type !== 'primary') {
        return (
            <div className={cn(css.column)}>
                <div>
                    <OptionSpan
                        data={pipe(
                            coinAmmount,
                            O.map(formatNumberToUI),
                            O.map((coinAmmount) => `${coinAmmount}`)
                        )}
                    />
                    <OptionSpan data={ticker} />
                </div>
                <OptionSpan data={name} className={css.coinName} />
            </div>
        );
    }

    return (
        <div className={cn(css.column)}>
            <div className={css.titleWrap}>
                {!isStableCoin && (
                    <OptionSpan
                        data={pipe(
                            coinAmmount,
                            O.map(formatNumberToUI),
                            O.map((coinAmmount) => `${coinAmmount}`)
                        )}
                    />
                )}
                <OptionSpan
                    className={css.title}
                    data={(() => (isStableCoin ? name : ticker))()}
                />
            </div>
            {!isStableCoin && (
                <OptionSpan data={name} className={css.coinName} />
            )}
        </div>
    );
};
