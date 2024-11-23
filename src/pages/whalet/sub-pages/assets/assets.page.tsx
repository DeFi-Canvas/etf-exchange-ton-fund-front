import css from './assets.module.css';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/e6de3a540555efba875b6afc5e8181ff.gif';
import AppButton from '@/components/AppButton/AppButton';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { CoinCardData } from '@/components/assets-card/assets-card.model';

export interface AssetsProps {
    assets: O.Option<Array<CoinCardData>>;
}

const emptyText =
    'Your assets balance is empty now. Get started by deposit or browsing through funds to discover opportunities.';

//TODO: вынести в модель
const formattedData = (assets: CoinCardData) => {
    // TODO:V Вынести глобально в стор или какое-то местное реакт хранилище - значок доллора перед переменной говорит о том, что переменная глобальная
    const $currency = '&dollar;';
    console.log(assets, '123');

    return {
        img: assets.logo,
        title: `${assets.coinAmount} ${assets.name}`,
        subTitle: assets.ticker,
        price: `${$currency} ${assets.cost}`,
        priceText: '',
    };
};

export const Assets = ({ assets }: AssetsProps) => {
    const currentAssets = pipe(
        assets,
        O.getOrElse(() => [] as Array<CoinCardData>)
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
                console.log(assetsData);

                return <AssetsCard key={assets.ticker} {...assetsData} />;
            })}
        </div>
    );
};
