import { useNavigate } from 'react-router-dom';
import css from './assets.module.css';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { Assets as AssetsCardBaseProps } from '@/components/assets-card/assets-card.model';
import * as E from 'fp-ts/Either';
import { AssetsViewModelInit } from './assets.view-model';
import { DepositAssets, DepositAssetsCodec } from '../deposit.model';
import { Asset, AssetCodec } from '@/pages/whalet/whalet.model';
import cn from 'classnames';
import { RenderEither } from '@/components/ui-kit/fpts-components-utils/either/either.component';

interface AssetsProps {
    assets: E.Either<string, Array<DepositAssets | Asset>>;
    type: AssetsViewModelInit;
    handleClick: (asset: DepositAssets | Asset) => void;
}

interface AssetsCardResult {
    data: DepositAssets | Asset;
    props: AssetsCardBaseProps;
}

// TODO:V Тут какакя-то шальная история с тиипизацией, возможно из-за кодеков (должно быть вроде DepositAssets | Asset)
const formattedData = (asset: DepositAssets | Asset): AssetsCardBaseProps => {
    if (DepositAssetsCodec.is(asset)) {
        return {
            img: asset.img,
            title: asset.name,
            subTitle: asset.description,
            price: '',
            priceText: '',
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

    return (
        <div className={cn('app-container', css.assetsWrapperContainer)}>
            <RenderEither
                data={assets}
                Component={(assetsItemData: AssetsCardResult) => (
                    <div
                        className={css.assetCardWrapper}
                        onClick={() => onClick(assetsItemData.data)}
                    >
                        <AssetsCard {...assetsItemData.props} />
                    </div>
                )}
                map={(d) => ({ data: d, props: formattedData(d) })}
            />
        </div>
    );
};
