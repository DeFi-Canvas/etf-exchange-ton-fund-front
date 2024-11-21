// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAttention from '../components/purchase-sell-attention/purchase-sell-attention.component';
// Style
import css from './purchase.module.css';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import PurchaseSellFooter from '../components/purchase-sell-footer/purchase-sell-footer.component';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { BottomSheetPurchaseBodyContainer } from './components/bottom-sheet-body/bottom-sheet-purchase-body.container';
import { PurchaseSellDetailsContainer } from '../components/purchase-sell-details/purchase-sell-details.container';
import { PurchaseSellAssetCardContainer } from '../components/purchase-sell-asset-card/purchase-sell-asset-card.container';

interface PurchasePageProps {
    onBuy: () => void;
    showBottomSheet: boolean;
    setShowBottomSheet: (x: boolean) => void;
}

const PurchasePage = injectable(
    PurchaseSellContentCardContainer,
    BottomSheetPurchaseBodyContainer,
    PurchaseSellDetailsContainer,
    PurchaseSellAssetCardContainer,

    (
            PurchaseSellContentCardContainer,
            BottomSheetBodyContainer,
            PurchaseSellDetailsContainer,
            PurchaseSellAssetCardContainer
        ) =>
        ({ showBottomSheet, setShowBottomSheet, onBuy }: PurchasePageProps) => {
            const handleToggleBottomSheet = () => {
                setShowBottomSheet(!showBottomSheet);
            };

            return (
                <div className={css.page}>
                    <div className="app-container">
                        <PurchaseSellIitle title="Purchase" />
                        <div className={css.assetCard}>
                            <PurchaseSellAssetCardContainer type={'BUY'} />
                        </div>
                        <PurchaseSellAttention />
                    </div>

                    <PurchaseSellContentCardContainer type={'BUY'} />

                    <PurchaseSellDetailsContainer
                        className={css.details}
                        title="Purchase Details"
                    />

                    <PurchaseSellFooter title="Buy" onClick={onBuy} />

                    <BottomSheet
                        open={showBottomSheet}
                        hasButtonClose={true}
                        onClose={handleToggleBottomSheet}
                    >
                        <div className={css.bottomSheetTitle}>Select asset</div>
                        <div className={css.assetList}>
                            <BottomSheetBodyContainer />
                        </div>
                    </BottomSheet>
                </div>
            );
        }
);

export default PurchasePage;
