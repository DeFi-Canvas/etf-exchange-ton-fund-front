import cn from 'classnames';
// Templates
import PurchaseSellAssetCard from '../purchase-sell-asset-card/purchase-sell-asset-card.component';
// Types
import { InterfacePurchaseSellAssetCardData } from '../../types';
// Style
import css from './purchase-sell-content-card.module.css';
import PurchaseSellFieldCounter from '../purchase-sell-field-counter/purchase-sell-field-counter.component';

interface PurchaseSellContentCardProps {
    assetCardData: InterfacePurchaseSellAssetCardData;
}
const PurchaseSellContentCard = (props: PurchaseSellContentCardProps) => {
    const maxQuantity = 304;
    const price = '$ 25,39';
    const priceConverted = '5,46 TON';

    return (
        <div className={css.card}>
            <div className={cn('app-container', css.cardContainer)}>
                <div className={css.section}>
                    <div className={css.cardTitle}>Asset</div>
                    <PurchaseSellAssetCard {...props.assetCardData} />
                </div>
                <div className={css.section}>
                    <header className={css.cardTitle}>
                        <span>Quantity</span>
                        <div className={css.maxCounter}> MAX: {maxQuantity}</div>
                    </header>
                    <PurchaseSellFieldCounter />
                </div>
                <div className={css.section}>
                    Total amount
                    <div className={css.totalAmountCard}>
                        <div className={css.totalAmountCardPrice}>{price}</div>
                        <div>{priceConverted}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSellContentCard;
