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
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { formatNumberExponent } from '@/utils/number';
import { Errors } from '@/store/errors/erorr-systrm';

export interface AssetsProps {
    assets: E.Either<Errors, Array<CoinCardData>>;
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
        title: `${assets.coinAmount ? formatNumberExponent(assets.coinAmount) : 0.0} ${assets.name}`,
        subTitle: assets.ticker,
        price: `${$currency} ${assets.cost ? formatNumberExponent(assets.cost) : 0.0}`,
        priceText: '',
    };
};

export const Assets = ({ assets }: AssetsProps) => {
    const eventBuilder = useTWAEvent();

    const footerSlot = () => (
        <div className={css.footerButtons}>
            {/* <AppButton
                label="Choose a fund"
                type="secondary"
                to="/what-to-buy"
            /> */}
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
                                <div key={assets.id}>
                                    <Link
                                        to={`/assets/${assets.id}`}
                                        key={assets.ticker}
                                        className="track-link"
                                        onClick={() => {
                                            trackTelemetree(
                                                eventBuilder,
                                                'WALLET_PAGE_ASSETS: specific asset  click',
                                                {
                                                    name: assets.name,
                                                    id: assets.id,
                                                }
                                            );
                                        }}
                                    >
                                        <AssetsCard
                                            {...formattedData(assets)}
                                        />
                                    </Link>
                                </div>
                            ))}
                    </>
                )}
            />
        </div>
    );
};
