import {
    CoinCardTemp,
    CoinCardTempProps,
} from '@/components/ui-kit/coin-card/coin-card.component';
import css from './funds.module.css';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/money_duck.gif';
import AppButton from '@/components/AppButton/AppButton';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';

const emptyText = `You don't have any investments in funds right now. Get started by browsing through funds to discover opportunities.`;

interface FundsProps {
    funds: E.Either<string, Array<CoinCardTempProps>>;
}
export const Funds = ({ funds }: FundsProps) => {
    const footerSlot = () => (
        <div className={css.footerButtons}>
            <AppButton to={'/deposit'} label="Deposit" type="secondary" />
            <AppButton label="Choose a fund" />
        </div>
    );

    const currentFunds = pipe(
        funds,
        E.fold(
            () => (
                // TODO: вот тут нужно впихнуть обработку не фактических значений 'pending' | 'err' etc
                <EmptyScrean
                    footerSlot={footerSlot}
                    emptyGif={emptyGif}
                    text={emptyText}
                />
            ),
            (funds) => {
                return (
                    <>
                        {funds.map((el) => (
                            // TODO: вот это я навертел фигни нужно переделать без оберток O.option
                            <CoinCardTemp {...el} key={el.logo} />
                        ))}
                    </>
                );
            }
        )
    );
    return <div className={css.wrap}>{currentFunds}</div>;
};
