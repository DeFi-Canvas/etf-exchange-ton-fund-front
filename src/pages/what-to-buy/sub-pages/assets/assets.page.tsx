import {
    CoinCard,
    CoinCardProps,
} from '@/components/ui-kit/coin-card/coin-card.component';
import css from './assets.module.css';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/e6de3a540555efba875b6afc5e8181ff.gif';

export interface AssetsProps {
    assets: O.Option<Array<CoinCardProps>>;
}

const emptyText =
    'Your assets balance is empty now. Get started by deposit or browsing through funds to discover opportunities.';

export const Assets = ({ assets }: AssetsProps) => {
    const currentAssets = pipe(
        assets,
        O.getOrElse(() => [] as Array<CoinCardProps>)
    );

    if (!currentAssets.length) {
        return <EmptyScrean emptyGif={emptyGif} text={emptyText} />;
    }
    return (
        <div className={css.wrap}>
            {currentAssets.map((el) => (
                <CoinCard
                    key={pipe(
                        el.ticker,
                        O.getOrElse(() => '-')
                    )}
                    {...el}
                />
            ))}
        </div>
    );
};
