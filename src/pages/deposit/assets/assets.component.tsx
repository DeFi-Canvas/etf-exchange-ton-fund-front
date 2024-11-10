import { Link } from 'react-router-dom';
import css from './assets.module.css';
import {
    AssetsCard,
    DepositAsserts,
    WithdrowAsserts,
} from '../assets-card/assets-card.component';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { ErrorResult } from '@/components/error-result/error-result.component';
import { AssetsViewModelInit } from './assets.view-model';

interface AssetsProps {
    assets: E.Either<string, Array<DepositAsserts | WithdrowAsserts>>;
    type: AssetsViewModelInit;
}

export const Assets = ({ assets, type }: AssetsProps) => {
    const mapLink = (ticker: string) => {
        switch (type) {
            case 'deposit':
                return `/deposit/${ticker}/deposit-end-point`;
            case 'withdrow':
                return `/withdraw/${ticker}`;
        }
    };
    const renderAssets = pipe(
        assets,
        E.fold(
            (e) => <ErrorResult error={e} />,
            (assets) => {
                return (
                    <>
                        {assets.map((el) => (
                            <Link key={el.ticker} to={mapLink(el.ticker)}>
                                <AssetsCard {...el} type={type} />
                            </Link>
                        ))}
                    </>
                );
            }
        )
    );
    return <div className={css.coinCards}>{renderAssets}</div>;
};
