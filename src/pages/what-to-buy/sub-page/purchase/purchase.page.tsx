import * as E from 'fp-ts/Either';

// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import PurchaseSellAttention from '../components/purchase-sell-attention/purchase-sell-attention.component';
import PurchaseSellDetails from '../components/purchase-sell-details/purchase-sell-details.component';
// Types
import type { InterfacePurchaseSellAssetCardData } from '../types';
import type { PurchaseSellDetailsData } from '../components/purchase-sell-details/purchase-sell-details.component';
// Style
import css from './purchase.module.css';
import { FundsData } from '../../what-to-buy.model';
import { Asset } from '@/pages/whalet/whalet.model';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import PurchaseSellFooter from '../components/purchase-sell-footer/purchase-sell-footer.component';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { useState } from 'react';

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

            const mockDataDetails: PurchaseSellDetailsData[] = [
                { title: 'Commission', value: '$ 0' },
                { title: 'Total in USD', value: '$ 25,39' },
                { title: 'Total in TON', value: '5,46' },
            ];

            const mockDataAssetCardList: InterfacePurchaseSellAssetCardData[] = [
                {
                    imageSrc: currentFundData.logo, // TODO сюда бы картиночку вкинуть монеты
                    title: '1 253,03 USD₮',
                    subTitle: 'Toncoin',
                    price: '$ 277,89',
                    allowedOpen: false,
                },
                {
                    imageSrc: currentFundData.logo, // TODO сюда бы картиночку вкинуть монеты
                    title: '649,92 TON',
                    subTitle: 'Toncoin',
                    price: '$ 1 277,54',
                    allowedOpen: false,
                },
                {
                    imageSrc: currentFundData.logo, // TODO сюда бы картиночку вкинуть монеты
                    title: '120 592,03 NOT',
                    subTitle: 'Toncoin',
                    price: '$ 442,05',
                    allowedOpen: false,
                }
            ];

            const [showBottomSheet, setShowBottomSheet] = useState(false);

            const handleToggleBottomSheet = () => {
              setShowBottomSheet(!showBottomSheet);
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

                    {/* TODO:V Не знаю как правильно клик прокинуть, это временное решение */}
                    <button onClick={(() => setShowBottomSheet(true))}>Open bottomSheet</button>

                    <PurchaseSellContentCardContainer />
                    <PurchaseSellDetails
                        className={css.details}
                        title="Purchase Details"
                        details={mockDataDetails}
                    />
                    <PurchaseSellFooter title="Buy" onClick={onBuy} />

                    <BottomSheet open={showBottomSheet} hasButtonClose={true} onClose={handleToggleBottomSheet}>
                        <div className={css.bottomSheetTitle}>Select asset</div>
                        <div className={css.assetList}>
                            {mockDataAssetCardList.map(assetCardData => (<PurchaseSellAssetCard {...assetCardData} />))}
                        </div>
                    </BottomSheet>
                </div>
            );
        }
);

export default PurchasePage;
