// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import PurchaseSellDetails from '../components/purchase-sell-details/purchase-sell-details.component';
import PurchaseSellFooter from '../components/purchase-sell-footer/purchase-sell-footer.component';
// Types
import type { InterfacePurchaseSellAssetCardData } from '../types';
import type { PurchaseSellDetailsData } from '../components/purchase-sell-details/purchase-sell-details.component';
// Style
import css from './sell.module.css';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import { injectable } from '@injectable-ts/core';
import { constVoid } from 'fp-ts/lib/function';

const SellPage = injectable(
    PurchaseSellContentCardContainer,
    (PurchaseSellContentCardContainer) => () => {
        // TODO:V Моки для (<PurchaseSellAssetCard />)
        const assetCardData: InterfacePurchaseSellAssetCardData = {
            imageSrc: './temp-asset-card-avatar.png', // TODO:V Лежит в root/public
            title: 'Canvas stable',
            subTitle: 'Defi Canvas',
            price: '$ 5,42',
            allowedOpen: true,
            isBackgroundWhite: true,
        };

        const mockDataDetails: PurchaseSellDetailsData[] = [
            { title: 'Commission', value: '$ 0' },
            { title: 'Total in USD', value: '$ 25,39' },
            { title: 'Total in TON', value: '5,46' },
        ];

        return (
            <div className={css.page}>
                <div className="app-container">
                    <PurchaseSellIitle title="Sell" />
                    <div className={css.assetCard}>
                        <PurchaseSellAssetCard
                            {...assetCardData}
                            onClick={constVoid}
                        />
                    </div>
                </div>
                <PurchaseSellContentCardContainer />
                <PurchaseSellDetails
                    className={css.details}
                    title="Sell Details"
                    details={mockDataDetails}
                />
                <PurchaseSellFooter title="Sell" onClick={() => {}} />
            </div>
        );
    }
);

export default SellPage;
