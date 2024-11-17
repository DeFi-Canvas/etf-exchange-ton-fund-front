// TODO:V Возможно это не нужно тут уже
import { CoinCardProps } from '@/components/ui-kit/coin-card/coin-card.component';
import css from './assets.module.css';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/e6de3a540555efba875b6afc5e8181ff.gif';
import AppButton from '@/components/AppButton/AppButton';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';

export interface AssetsProps {
    assets: O.Option<Array<CoinCardProps>>;
}

const emptyText =
    'Your assets balance is empty now. Get started by deposit or browsing through funds to discover opportunities.';

const formattedData = (assets: CoinCardProps) => {
    const data = {
        img: '',
        title: '',
        subTitle: '',
        price: '',
        priceText: '',
    };

    // TODO:V Вынести глобально в стор или какое-то местное реакт хранилище - значок доллора перед переменной говорит о том, что переменная глобальная
    const $currency = '&dollar;';

    if (assets.logo._tag !== 'None') {
        data.img = assets.logo.value;
    }
    if (assets.name._tag !== 'None' && assets.coinAmount._tag !== 'None') {
        data.title = `${assets.coinAmount.value} ${assets.name.value}`;
    }
    if (assets.ticker._tag !== 'None') {
        data.subTitle = assets.ticker.value;
    }
    if (assets.cost._tag !== 'None') {
        data.price = `${$currency} ${assets.cost.value}`;
    }

    return data;
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
