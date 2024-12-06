import cn from 'classnames';
// Templates
import PurchaseSellAssetCard from '../purchase-sell-asset-card/purchase-sell-asset-card.component';
// Types
import { InterfacePurchaseSellAssetCardData } from '../../types';
// Style
import css from './purchase-sell-content-card.module.css';
import * as O from 'fp-ts/Option';
import { TotalAmount } from '../../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellFieldCounterContainer } from '../purchase-sell-field-counter/purchase-sell-field-counter.container';

interface PurchaseSellContentCardProps {
    assetCardData: InterfacePurchaseSellAssetCardData;
    totalAmount: O.Option<TotalAmount>;
    onClick: () => void;
}
const PurchaseSellContentCard = injectable(
    PurchaseSellFieldCounterContainer,
    (PurchaseSellFieldCounterContainer) =>
        ({
            assetCardData,
            totalAmount,
            onClick,
        }: PurchaseSellContentCardProps) => {
            const currentTotalAmount = pipe(
                totalAmount,
                O.getOrElse(() => ({
                    currency: 0,
                    coin: 0,
                }))
            );

            return (
                <div className={css.card}>
                    <div className={cn('app-container', css.cardContainer)}>
                        <div className={css.section}>
                            <div className={css.cardTitle}>Asset</div>
                            <PurchaseSellAssetCard
                                {...assetCardData}
                                onClick={onClick}
                            />
                        </div>
                        <div className={css.section}>
                            <header className={css.cardTitle}>
                                <span>Amount</span>
                            </header>
                            <PurchaseSellFieldCounterContainer />
                            <div>≈ {currentTotalAmount.coin}</div>
                        </div>
                    </div>
                </div>
            );
        }
);

export default PurchaseSellContentCard;
