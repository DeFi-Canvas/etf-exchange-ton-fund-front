import { useNavigate } from 'react-router-dom';
import css from './assets.module.css';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { Assets as AssetsCardBaseProps } from '@/components/assets-card/assets-card.model';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { ErrorResult } from '@/components/error-result/error-result.component';
import { AssetsViewModelInit } from './assets.view-model';
import { DepositAssets, DepositAssetsCodec } from '../deposit.model';
import { Asset, AssetCodec } from '@/pages/whalet/whalet.model';
import cn from 'classnames';

interface AssetsProps {
    assets: E.Either<string, Array<DepositAssets | Asset>>;
    type: AssetsViewModelInit;
    handleClick: (asset: DepositAssets | Asset) => void;
}

// TODO:V Тут какакя-то шальная история с тиипизацией, возможно из-за кодеков (должно быть вроде DepositAssets | Asset)
const formattedData = (asset: DepositAssets | Asset): AssetsCardBaseProps => {
    if (DepositAssetsCodec.is(asset)) {
        return {
            img: asset.img,
            title: asset.name,
            subTitle: asset.description,
            price: '',
            priceText: undefined,
        };
    } else {
        return {
            img: asset.image_url,
            title: asset.name,
            subTitle: asset.symbol,
            price: asset.value.toFixed(2),
            priceText: '',
        };
    }
};

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
                        {assets.map((assetsItemData) => (
                            <div
                                key={assetsItemData.name}
                                className={css.assetCardWrapper}
                                onClick={() => onClick(assetsItemData)}
                            >
                                <AssetsCard
                                    {...formattedData(assetsItemData)}
                                />
                            </div>
                        ))}
                    </>
                );
            }
        )
    );
    return (
        <div className={cn('app-container', css.assetsWrapperContainer)}>
            {renderAssets}
        </div>
    );
};
