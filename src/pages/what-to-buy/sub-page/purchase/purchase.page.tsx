import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import PurchaseSellAttention from '../components/purchase-sell-attention/purchase-sell-attention.component';
import PurchaseSellContentCard from '../components/purchase-sell-content-card/purchase-sell-content-card.component';
// Types
import { InterfacePurchaseSellAssetCardData } from '../types';
// Style
import css from './purchase.module.css';
import { FundsData } from '../../what-to-buy.model';
import { Asset } from '@/pages/whalet/whalet.model';
import { TotalAmount } from './purchase.view-model';

interface PurchasePageProps {
    fundData: E.Either<string, FundsData>;
    assets: E.Either<string, Array<Asset>>;
    selectedAssets: E.Either<string, Asset>;
    totalAmount: O.Option<TotalAmount>;
    quantity: number;
    increment: () => void;
    onBuy: () => void;
    dicrement: () => void;
}

const PurchasePage = ({
    fundData,
    assets,
    selectedAssets,
    quantity,
    increment,
    dicrement,
    totalAmount,
    onBuy,
}: PurchasePageProps) => {
    console.log(selectedAssets);

    // TODO: Сделать через RenderEither
    const currentFundData = E.isRight(fundData)
        ? fundData.right
        : ({} as FundsData);
    //TODO:V - все доступные ассееты  в типе Asset
    // const currentAssets = E.isRight(assets)
    //     ? assets.right
    //     : ([] as Array<Asset>);

    const currentSelectedAssets = E.isRight(selectedAssets)
        ? selectedAssets.right
        : ({} as Asset);
    // TODO:V Моки для (<PurchaseSellAssetCard />) - ЕСЛИ ДЕЛАЕШЬ МОК УКАЗЫВАЙ ЕГО ТИП
    const assetCardData: InterfacePurchaseSellAssetCardData = {
        imageSrc: currentFundData.logo, // TODO:V Лежит в root/public
        title: currentFundData.name,
        subTitle: currentFundData.description,
        price: `$ ${currentFundData.cost}`,
        allowedOpen: false,
        isBackgroundWhite: true,
    };
    //TODO: написать маппер
    const assetCardDataContentCard = {
        imageSrc: currentSelectedAssets.image_url,
        title: `${currentSelectedAssets.value} ${currentSelectedAssets.symbol}`,
        subTitle: `$ ${
            currentSelectedAssets.price * currentSelectedAssets.value
        }`,
        price: `${currentSelectedAssets.balance}`,
        allowedOpen: true,
        isBackgroundWhite: false,
    };

    return (
        <div className={css.page}>
            <div className="app-container">
                <PurchaseSellIitle title="Purchase" />
                <div className={css.assetCard}>
                    <PurchaseSellAssetCard {...assetCardData} />
                </div>
                <PurchaseSellAttention />
            </div>
            <PurchaseSellContentCard
                assetCardData={assetCardDataContentCard}
                quantity={quantity}
                increment={increment}
                dicrement={dicrement}
                totalAmount={totalAmount}
            />
            <button onClick={onBuy}>купить</button>
            {/* Details */}
            {/* footer */}
        </div>
    );
};

export default PurchasePage;
