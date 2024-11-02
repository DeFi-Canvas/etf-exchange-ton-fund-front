import {
    CoinCard,
    CoinCardProps,
} from '@/components/ui-kit/coin-card/coin-card.component';
import css from './assets.module.css';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { EmptyScrean } from '../epty-screan/epty-screan.component';

export interface AssetsProps {
    assets: O.Option<Array<CoinCardProps>>;
}

const emptyGif =
    'https://s3-alpha-sig.figma.com/img/539a/bc5a/e6de3a540555efba875b6afc5e8181ff?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ngN6pOsKj3hZ1e2Ww4hwOsTces6Zdt~adu87xGmi2WRaDp7n7MOkG0D3ILf4GdomFUhSNBAttRs8eyS6Iu8GJaRJwUwgrrR3F3Pb1hdTE1v-eJWPLLe7PNu4VEn2n~Ukm3Ab0I4ZyiCtBvbisd3JbgzV31lHVluorkq15MTdA5lBxMSgT3mtZEO-JQDC86GHS1Az7DWpU97laTdR6VI-JZdXTLCLTmlDcqSuyKga2bXhsH6~QEDRCzwGdBdIePvepplRpFjFodCdd9UoUOVaFNr7aRQ1Hzu1wbBR2ZVIsZidkddo-Kh~j6c7XR2vf5QTeNjx-4o9JwD9bNPUjmnDDA__';

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
