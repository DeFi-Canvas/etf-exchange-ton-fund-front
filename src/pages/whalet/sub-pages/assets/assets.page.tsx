import css from './assets.module.css';
import * as E from 'fp-ts/Either';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/sad_duck.gif';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { CoinCardData } from '@/components/assets-card/assets-card.model';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { SkeletonCardSection } from '@/components/skeletons/skeleton-card/skeleton-card-section.component';
import { Link } from 'react-router-dom';

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
        id: assets.id,
        img: assets.logo,
        title: `${assets.coinAmount?.toFixed(2)} ${assets.name}`,
        subTitle: assets.ticker,
        price: `${$currency} ${assets.cost?.toFixed(2)}`,
        priceText: '',
    };
};

export const Assets = ({ assets }: AssetsProps) => {
    const footerSlot = () => (
        <div className={css.footerButtons}>
            {/* TODO:  на страницу фондов */}
            <AppButton
                label="Choose a fund"
                type="secondary"
                to="/what-to-buy"
            />
            <AppButton to={'/deposit'} label="Deposit" />
        </div>
    );
    return (
        <div className={css.wrap}>
            <RenderResult
                data={assets}
                loading={() => <SkeletonCardSection count={4} type={'small'} />}
                failure={() => (
                    <EmptyScrean
                        footerSlot={footerSlot}
                        emptyGif={emptyGif}
                        text={emptyText}
                    />
                )}
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
                                <Link
                                    to={`/assets/${assets.id}`}
                                    key={assets.ticker}
                                >
                                    <AssetsCard {...formattedData(assets)} />
                                </Link>
                            ))}
                    </>
                )}
            />
        </div>
    );
};
