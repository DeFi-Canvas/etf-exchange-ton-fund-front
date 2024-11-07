import { Link } from 'react-router-dom';
import css from './assets.module.css';
import {
    AssetsCard,
    DepositAsserts,
} from '../assets-card/assets-card.component';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { ErrorResult } from '@/components/error-result/error-result.component';

interface AssetsProps {
    assets: E.Either<string, Array<DepositAsserts>>;
}

export const Assets = ({ assets }: AssetsProps) => {
    const renderAssets = pipe(
        assets,
        E.fold(
            (e) => <ErrorResult error={e} />,
            (assets) => {
                return (
                    <>
                        {assets.map((el) => (
                            <Link
                                key={el.ticker}
                                to={`/deposit/${el.ticker}/deposit-end-point`}
                            >
                                <AssetsCard {...el} />
                            </Link>
                        ))}
                    </>
                );
            }
        )
    );
    return <div className={css.coinCards}>{renderAssets}</div>;
};
