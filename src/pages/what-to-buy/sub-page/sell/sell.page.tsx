import * as O from 'fp-ts/Option';
// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import PurchaseSellContentCard from '../components/purchase-sell-content-card/purchase-sell-content-card.component';
// Types
import { InterfacePurchaseSellAssetCardData } from '../types';
// Style
import css from './sell.module.css';
import { constVoid } from 'fp-ts/lib/function';

const SellPage = () => {
    // TODO:V Моки для (<PurchaseSellAssetCard />)
    const assetCardData: InterfacePurchaseSellAssetCardData = {
        imageSrc: './temp-asset-card-avatar.png', // TODO:V Лежит в root/public
        title: 'Canvas stable',
        subTitle: 'Defi Canvas',
        price: '$ 5,42',
        allowedOpen: true,
        isBackgroundWhite: true,
    };
    const assetCardDataContentCard = Object.assign(
        {},
        {
            ...assetCardData,
            title: '5 pcs.',
            subTitle: '',
            price: '$ 25,39',
            isBackgroundWhite: false,
            allowedOpen: false,
        }
    );

    return (
        <div className={css.page}>
            <div className="app-container">
                <PurchaseSellIitle title="Sell" />
                <div className={css.assetCard}>
                    <PurchaseSellAssetCard {...assetCardData} />
                </div>
            </div>
            <PurchaseSellContentCard
                assetCardData={assetCardDataContentCard}
                quantity={0}
                increment={constVoid}
                dicrement={constVoid}
                totalAmount={O.of({ coin: 0, currency: 0 })}
            />
            {/* Details */}
            {/* footer */}
        </div>
    );
};

export default SellPage;
