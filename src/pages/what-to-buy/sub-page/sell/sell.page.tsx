// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellFooter from '../components/purchase-sell-footer/purchase-sell-footer.component';
// Style
import css from './sell.module.css';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellDetailsContainer } from '../components/purchase-sell-details/purchase-sell-details.container';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { PurchaseSellAssetCardContainer } from '../components/purchase-sell-asset-card/purchase-sell-asset-card.container';
import { PurchaseSellFinishBoodySheetContainer } from '../components/purchase-sell-finish-boody-sheet/purchase-sell-finish-boody-sheet.container';

interface SellPageProps {
    showBottomSheet: boolean;
    setShowBottomSheet: (x: boolean) => void;
}

const SellPage = injectable(
    PurchaseSellContentCardContainer,
    PurchaseSellDetailsContainer,
    PurchaseSellAssetCardContainer,
    PurchaseSellFinishBoodySheetContainer,
    (
            PurchaseSellContentCardContainer,
            PurchaseSellDetailsContainer,
            PurchaseSellAssetCardContainer,
            PurchaseSellFinishBoodySheetContainer
        ) =>
        ({ showBottomSheet, setShowBottomSheet }: SellPageProps) => {
            const handleToggleBottomSheet = () => {
                setShowBottomSheet(!showBottomSheet);
            };
            return (
                <div className={css.page}>
                    <div className="app-container">
                        <PurchaseSellIitle title="Sell" />
                        <div className={css.assetCard}>
                            <PurchaseSellAssetCardContainer type={'SELL'} />
                        </div>
                    </div>
                    <PurchaseSellContentCardContainer type={'SELL'} />
                    <PurchaseSellDetailsContainer
                        className={css.details}
                        title="Sell Details"
                    />
                    <PurchaseSellFooter
                        title="Sell"
                        onClick={() => {}}
                        isLoading={false}
                    />

                    <BottomSheet
                        open={showBottomSheet}
                        hasButtonClose={true}
                        onClose={handleToggleBottomSheet}
                    >
                        <PurchaseSellFinishBoodySheetContainer />
                    </BottomSheet>
                </div>
            );
        }
);

export default SellPage;
