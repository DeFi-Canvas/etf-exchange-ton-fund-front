import * as E from 'fp-ts/Either';

// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import PurchaseSellAttention from '../components/purchase-sell-attention/purchase-sell-attention.component';
// Types
import { InterfacePurchaseSellAssetCardData } from '../types';
// Style
import css from './purchase.module.css';
import { FundsData } from '../../what-to-buy.model';
import { Asset } from '@/pages/whalet/whalet.model';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';

interface PurchasePageProps {
    fundData: E.Either<string, FundsData>;
    assets: E.Either<string, Array<Asset>>;
    onBuy: () => void;
}

const PurchasePage = injectable(
    PurchaseSellContentCardContainer,
    (PurchaseSellContentCardContainer) =>
        ({
            fundData,
            // assets,
            // totalAmount,
            onBuy,
        }: PurchasePageProps) => {
            // TODO: Сделать через RenderEither
            const currentFundData = E.isRight(fundData)
                ? fundData.right
                : ({} as FundsData);
            //TODO:V - все доступные ассееты  в типе Asset
            // const currentAssets = E.isRight(assets)
            //     ? assets.right
            //     : ([] as Array<Asset>);

            // TODO:V Моки для (<PurchaseSellAssetCard />) - ЕСЛИ ДЕЛАЕШЬ МОК УКАЗЫВАЙ ЕГО ТИП
            const assetCardData: InterfacePurchaseSellAssetCardData = {
                imageSrc: currentFundData.logo, // TODO:V Лежит в root/public
                title: currentFundData.name,
                subTitle: currentFundData.description,
                price: `$ ${currentFundData.cost}`,
                allowedOpen: false,
                isBackgroundWhite: true,
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
                    <PurchaseSellContentCardContainer />
                    <button onClick={onBuy}>купить</button>
                    {/* Details */}
                    {/* footer */}
                </div>
            );
        }
);

export default PurchasePage;