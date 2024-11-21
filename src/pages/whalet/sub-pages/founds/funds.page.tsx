import css from './funds.module.css';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/money_duck.gif';
import AppButton from '@/components/AppButton/AppButton';
import * as E from 'fp-ts/Either';
import { AssetsCard } from '@/components/assets-card/assets-card.component';
import { RenderEither } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { CoinCardData } from '@/components/assets-card/assets-card.model';

const emptyText = `You don't have any investments in funds right now. Get started by browsing through funds to discover opportunities.`;

interface FundsProps {
    funds: E.Either<string, Array<CoinCardData>>;
}

//TODO: вынести в модель
const formattedData = (assets: CoinCardData) => {
    // TODO:V Вынести глобально в стор или какое-то местное реакт хранилище - значок доллора перед переменной говорит о том, что переменная глобальная
    const $currency = '&dollar;';

    return {
        img: assets.logo,
        title: `${assets.name}`,
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

    return (
        <div className={css.wrap}>
            <RenderEither
                data={funds}
                OnLoad={() => (
                    <EmptyScrean
                        footerSlot={footerSlot}
                        emptyGif={emptyGif}
                        text={emptyText}
                    />
                )}
                OnError={() => (
                    <EmptyScrean
                        footerSlot={footerSlot}
                        emptyGif={emptyGif}
                        text={emptyText}
                    />
                )}
                Component={AssetsCard}
                map={formattedData}
            />
        </div>
    );
};
