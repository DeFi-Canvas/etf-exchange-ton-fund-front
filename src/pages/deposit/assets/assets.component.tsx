import { useNavigate } from 'react-router-dom';
import css from './assets.module.css';
import { AssetsCard } from '../assets-card/assets-card.component';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { ErrorResult } from '@/components/error-result/error-result.component';
import { AssetsViewModelInit } from './assets.view-model';
import { DepositAssets, DepositAssetsCodec } from '../deposit.model';
import { Asset, AssetCodec } from '@/pages/whalet/whalet.model';

interface AssetsProps {
    assets: E.Either<string, Array<DepositAssets | Asset>>;
    type: AssetsViewModelInit;
    handleClick: (asset: DepositAssets | Asset) => void;
}

export const Assets = ({ assets, type, handleClick }: AssetsProps) => {
    const navigate = useNavigate();

    const mapLink = (asset: DepositAssets | Asset) => {
        switch (type) {
            case 'deposit':
                return DepositAssetsCodec.is(asset)
                    ? `/deposit/${asset.ticker}/deposit-end-point`
                    : '';
            case 'withdrow':
                return AssetCodec.is(asset) ? `/withdraw/${asset.symbol}` : '';
        }
    };

    const onClick = (asset: DepositAssets | Asset) => {
        handleClick(asset);
        navigate(mapLink(asset));
    };

    const renderAssets = pipe(
        assets,
        E.fold(
            (e) => <ErrorResult error={e} />,
            (assets) => {
                return (
                    <>
                        {assets.map((el) => (
                            // <Link key={el.name} to={mapLink(el)}>
                            <button key={el.name} onClick={() => onClick(el)}>
                                <AssetsCard {...el} type={type} />
                            </button>
                            // </Link>
                        ))}
                    </>
                );
            }
        )
    );
    return <div className={css.coinCards}>{renderAssets}</div>;
};
