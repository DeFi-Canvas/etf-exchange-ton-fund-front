import { useNavigate } from 'react-router-dom';
import css from './assets.module.css';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { AssetsUI as AssetsCardBaseProps } from '@/components/assets-card/assets-card.model';
import * as E from 'fp-ts/Either';
import { AssetsViewModelInit } from './assets.view-model';
import { DepositAsset, DepositAssetsCodec } from '../deposit.model';
import cn from 'classnames';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { SkeletonCardSection } from '@/components/skeletons/skeleton-card/skeleton-card-section.component';
import { AssetBalance } from '@/instance/asset/asset.model';
import { Error } from '@/store/errors/error-system';

interface AssetsProps {
    assets: E.Either<Error, Array<DepositAsset | AssetBalance>>;
    type: AssetsViewModelInit;
    handleClick: (asset: DepositAsset | AssetBalance) => void;
}

const formattedData = (
    asset: DepositAsset | AssetBalance
): AssetsCardBaseProps => {
    if (DepositAssetsCodec.is(asset)) {
        return {
            id: asset.id,
            img: asset.img,
            title: asset.name,
            subTitle: asset.description,
            price: '',
            priceText: '',
        };
    } else {
        return {
            id: asset.id,
            img: asset.imageUrl,
            title: asset.name,
            subTitle: asset.ticker,
            price: '',
            priceText: '',
        };
    }
};

export const Assets = ({ assets, type, handleClick }: AssetsProps) => {
    const navigate = useNavigate();

    const mapLink = (asset: DepositAsset | AssetBalance) => {
        switch (type) {
            case 'deposit':
                return `/deposit/${asset.ticker}/deposit-end-point`;
            case 'withdrow':
                return `/withdraw/${asset.ticker}`;
        }
    };

    const onClick = (asset: DepositAsset | AssetBalance) => {
        handleClick(asset);
        navigate(mapLink(asset));
    };

    return (
        <div className={cn('app-container', css.assetsWrapperContainer)}>
            <RenderResult
                data={assets}
                loading={() => <SkeletonCardSection count={4} type={'small'} />}
                success={(assets) => {
                    return (
                        <>
                            {assets.map((asset) => (
                                <div
                                    key={asset.name}
                                    className={css.assetCardWrapper}
                                    onClick={() => onClick(asset)}
                                >
                                    <AssetsCard {...formattedData(asset)} />
                                </div>
                            ))}
                        </>
                    );
                }}
            />
        </div>
    );
};
