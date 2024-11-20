import cn from 'classnames';
// Templates
import PurchaseSellAssetCard from '../purchase-sell-asset-card/purchase-sell-asset-card.component';
// Types
import { InterfacePurchaseSellAssetCardData } from '../../types';
// Style
import css from './purchase-sell-content-card.module.css';
import PurchaseSellFieldCounter, {
    PurchaseSellFieldCounterProps,
} from '../purchase-sell-field-counter/purchase-sell-field-counter.component';
import * as O from 'fp-ts/Option';
import { TotalAmount } from '../../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';

interface PurchaseSellContentCardProps extends PurchaseSellFieldCounterProps {
    assetCardData: InterfacePurchaseSellAssetCardData;
    totalAmount: O.Option<TotalAmount>;
}
const PurchaseSellContentCard = ({
    assetCardData,
    totalAmount,
    ...rest
}: PurchaseSellContentCardProps) => {
    const currentTotalAmount = pipe(
        totalAmount,
        O.getOrElse(() => ({
            currency: 0,
            coin: 0,
        }))
    );

    const maxQuantity = 304;

    return (
        <div className={css.card}>
            <div className={cn('app-container', css.cardContainer)}>
                <div className={css.section}>
                    <div className={css.cardTitle}>Asset</div>
                    <PurchaseSellAssetCard {...assetCardData} />
                </div>
                <div className={css.section}>
                    <header className={css.cardTitle}>
                        <span>Quantity</span>
                        <div className={css.maxCounter}>MAX: {maxQuantity}</div>
                    </header>
                    <PurchaseSellFieldCounter {...rest} />
                </div>
                <div className={css.section}>
                    Total amount
                    <div className={css.totalAmountCard}>
                        <div className={css.totalAmountCardPrice}>
                            {currentTotalAmount.currency}
                        </div>
                        <div>{currentTotalAmount.coin}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseSellContentCard;
