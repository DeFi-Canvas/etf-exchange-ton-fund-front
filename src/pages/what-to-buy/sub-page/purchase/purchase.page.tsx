// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
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
    };

    return (
        <div className={css.page}>
            <div className="app-container">
                <PurchaseSellIitle title="Purchase" />
                <PurchaseSellAssetCard {...assetCardData} />
            </div>

            {/* assetCard */}
            {/* attention */}
            {/* assetContentCard */}
            {/* Details */}
            {/* footer */}
        </div>
    )
}

export default PurchasePage;
