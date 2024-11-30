import css from './assets.module.css';
import * as E from 'fp-ts/Either';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/sad_duck.gif';
import AppButton from '@/components/AppButton/AppButton';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { CoinCardData } from '@/components/assets-card/assets-card.model';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { SkeletonCardSection } from '@/components/skeletons/skeleton-card/skeleton-card-section.component';

export interface AssetsProps {
    assets: E.Either<string, Array<CoinCardData>>;
}

const emptyText =
    'Your assets balance is empty now. Get started by deposit or browsing through funds to discover opportunities.';

//TODO: вынести в модель
const formattedData = (assets: CoinCardData) => {
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

export const Assets = ({ assets }: AssetsProps) => {
    const footerSlot = () => (
        <div className={css.footerButtons}>
            <AppButton label="Choose a fund" type="secondary" />
            <AppButton to={'/deposit'} label="Deposit" />
        </div>
    );
    return (
        <div className={css.wrap}>
            <RenderResult
                data={assets}
                loading={() => <SkeletonCardSection count={4} type={'small'} />}
                success={(assets) => (
                    <>
                        {!assets.length && (
                            <EmptyScrean
                                footerSlot={footerSlot}
                                emptyGif={emptyGif}
                                text={emptyText}
                            />
                        )}
                        {assets.length &&
                            assets.map((assets) => (
                                <AssetsCard
                                    key={assets.ticker}
                                    {...formattedData(assets)}
                                />
                            ))}
                    </>
                )}
            />
        </div>
    );
};
