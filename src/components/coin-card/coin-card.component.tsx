import { pipe } from 'fp-ts/lib/function';
import css from './coin-card.module.css';
import * as O from 'fp-ts/Option';
import { OptionSpan } from '../fpts-components-utils/options.component';
import cn from 'classnames';
import { formatNumberToUI } from '@/utils/number';

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
}

export const CoinCard = ({
    logo,
    name,
    isStableCoin = false,
    ticker,
    coinAmmount,
    cost,
    pnl,
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
    return (
        <div className={css.wrap}>
            <CoinLogo />
            <div className={cn(css.column)}>
                <div>
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
                        data={(() => (isStableCoin ? name : ticker))()}
                    />
                </div>
                {!isStableCoin && (
                    <OptionSpan data={name} className={css.coinName} />
                )}
            </div>
            <div className={css.money}>
                <OptionSpan
                    modificator="$"
                    data={pipe(
                        cost,
                        O.map(formatNumberToUI),
                        O.map((cost) => `${cost}`)
                    )}
                />
                {!isStableCoin && isPnLExists && (
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
                                    (pnl) => `${pnl.ammount} ${pnl.currency} `
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
        </div>
    );
};
