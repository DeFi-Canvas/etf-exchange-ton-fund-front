import * as E from 'fp-ts/Either';

// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAssetCard from '../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import PurchaseSellAttention from '../components/purchase-sell-attention/purchase-sell-attention.component';
// Style
import css from './purchase.module.css';
import { FundsData, mapFundToUICard } from '../../what-to-buy.model';
import { Asset } from '@/pages/whalet/whalet.model';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import PurchaseSellFooter from '../components/purchase-sell-footer/purchase-sell-footer.component';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { constVoid } from 'fp-ts/lib/function';
import { BottomSheetBodyContainer } from './components/bottom-sheet-body/bottom-sheet-body.container';
import { PurchaseSellDetailsContainer } from '../components/purchase-sell-details/purchase-sell-details.container';

interface PurchasePageProps {
    fundData: E.Either<string, FundsData>;
    assets: E.Either<string, Array<Asset>>;
    onBuy: () => void;
    showBottomSheet: boolean;
    setShowBottomSheet: (x: boolean) => void;
}

const PurchasePage = injectable(
    PurchaseSellContentCardContainer,
    BottomSheetBodyContainer,
    PurchaseSellDetailsContainer,
    (
            PurchaseSellContentCardContainer,
            BottomSheetBodyContainer,
            PurchaseSellDetailsContainer
        ) =>
        ({
            fundData,
            showBottomSheet,
            setShowBottomSheet,
            onBuy,
        }: PurchasePageProps) => {
            // TODO: Сделать через RenderEither
            const currentFundData = E.isRight(fundData)
                ? fundData.right
                : ({} as FundsData);

            const assetCardData = mapFundToUICard(currentFundData, false);

            const handleToggleBottomSheet = () => {
                setShowBottomSheet(!showBottomSheet);
            };

            return (
                <div className={css.page}>
                    <div className="app-container">
                        <PurchaseSellIitle title="Purchase" />
                        <div className={css.assetCard}>
                            <PurchaseSellAssetCard
                                {...assetCardData}
                                onClick={constVoid}
                            />
                        </div>
                        <PurchaseSellAttention />
                    </div>

                    <PurchaseSellContentCardContainer />

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
