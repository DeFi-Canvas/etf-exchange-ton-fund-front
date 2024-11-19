// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import PurchaseSellAttention from '../components/purchase-sell-attention/purchase-sell-attention.component';
import PurchaseSellContentCard from '../components/purchase-sell-content-card/purchase-sell-content-card.component';
// Types
import { InterfacePurchaseSellAssetCardData } from '../types';
// Style
import css from './purchase.module.css';

const PurchasePage = () => {
    // TODO:V Моки для (<PurchaseSellAssetCard />)
    const assetCardData: InterfacePurchaseSellAssetCardData = {
        imageSrc: './temp-asset-card-avatar.png', // TODO:V Лежит в root/public
        title: 'Canvas stable',
        subTitle: 'Defi Canvas',
        price: '$ 5,42',
        allowedOpen: false,
        isBackgroundWhite: true,
    };
    const assetCardDataContentCard = Object.assign(
        {},
        {
            ...assetCardData,
            imageSrc: './temp-ton.png',
            title: '649,92 TON',
            subTitle: '$ 1 277,54',
            price: '',
            allowedOpen: true,
            isBackgroundWhite: false,
        }
    );

    return (
        <div className={css.page}>
            <div className="app-container">
                <PurchaseSellIitle title="Purchase" />
                <div className={css.assetCard}>
                    <PurchaseSellAssetCard {...assetCardData} />
                </div>
                <PurchaseSellAttention />
            </div>
            <PurchaseSellContentCard assetCardData={assetCardDataContentCard} />
            {/* Details */}
            {/* footer */}
        </div>
    );
};

export default PurchasePage;
