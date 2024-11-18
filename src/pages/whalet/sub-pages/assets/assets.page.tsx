// TODO:V Возможно это не нужно тут уже
import { CoinCardProps } from '@/components/ui-kit/coin-card/coin-card.component';
import css from './assets.module.css';
import * as O from 'fp-ts/Option';
import { constant, pipe } from 'fp-ts/lib/function';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/e6de3a540555efba875b6afc5e8181ff.gif';
import AppButton from '@/components/AppButton/AppButton';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';

export interface AssetsProps {
    assets: O.Option<Array<CoinCardProps>>;
}

const emptyText =
    'Your assets balance is empty now. Get started by deposit or browsing through funds to discover opportunities.';

//TODO: вынести в модель
const formattedData = (assets: CoinCardProps) => {
    // TODO:V Вынести глобально в стор или какое-то местное реакт хранилище - значок доллора перед переменной говорит о том, что переменная глобальная
    const $currency = '&dollar;';

    return {
        img: pipe(assets.logo, O.getOrElse(constant(''))),
        title: pipe(
            assets.name,
            O.chain((name) =>
                pipe(
                    assets.coinAmount,
                    O.map((coinAmount) => `${coinAmount} ${name}`)
                )
            ),
            O.getOrElse(constant(''))
        ),
        subTitle: pipe(assets.ticker, O.getOrElse(constant(''))),
        price: pipe(
            assets.cost,
            O.map((cost) => `${$currency} ${cost}`),
            O.getOrElse(constant(''))
        ),
        priceText: '',
    };
};

export const Assets = ({ assets }: AssetsProps) => {
    const currentAssets = pipe(
        assets,
        O.getOrElse(() => [] as Array<CoinCardProps>)
    );

    const footerSlot = () => (
        <div className={css.footerButtons}>
            <AppButton label="Choose a fund" type="secondary" />
            <AppButton to={'/deposit'} label="Deposit" />
        </div>
    );

    if (!currentAssets.length) {
        return (
            <EmptyScrean
                footerSlot={footerSlot}
                emptyGif={emptyGif}
                text={emptyText}
            />
        );
    }

    return (
        <div className={css.wrap}>
            {currentAssets.map((assets) => {
                const assetsData = formattedData(assets);
                const uniqKey = pipe(
                    assets.ticker,
                    O.getOrElse(() => '-')
                );

                return <AssetsCard key={uniqKey} {...assetsData} />;
            })}
        </div>
    );
};
