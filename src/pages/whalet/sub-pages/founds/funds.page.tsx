import { CoinCardTempProps } from '@/components/ui-kit/coin-card/coin-card.component';
import css from './funds.module.css';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/money_duck.gif';
import AppButton from '@/components/AppButton/AppButton';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import { AssetsCard } from '@/components/assets-card/assets-card.component';

const emptyText = `You don't have any investments in funds right now. Get started by browsing through funds to discover opportunities.`;

interface FundsProps {
    funds: E.Either<string, Array<CoinCardTempProps>>;
}

//TODO: вынести в модель
const formattedData = (assets: CoinCardTempProps) => {
    // TODO:V Вынести глобально в стор или какое-то местное реакт хранилище - значок доллора перед переменной говорит о том, что переменная глобальная
    const $currency = '&dollar;';

    return {
        img: assets.logo,
        title: `${assets.coinAmount} ${assets.name}`,
        subTitle: assets.ticker,
        price: `${$currency} ${assets.cost}`,
        priceText: '',
    };
};

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
                        {funds.map((assets) => {
                            const assetsData = formattedData(assets);

                            return (
                                <AssetsCard
                                    key={assets.ticker}
                                    {...assetsData}
                                />
                            );
                        })}
                    </>
                );
            }
        )
    );
    return <div className={css.wrap}>{currentFunds}</div>;
};
