// Templates
import PurchaseSellTitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellAttention from '../components/purchase-sell-attention/purchase-sell-attention.component';
// Style
import css from './purchase.module.css';
import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { BottomSheetPurchaseBodyContainer } from './components/bottom-sheet-body/bottom-sheet-purchase-body.container';
import { PurchaseSellDetailsContainer } from '../components/purchase-sell-details/purchase-sell-details.container';
import { PurchaseSellAssetCardContainer } from '../components/purchase-sell-asset-card/purchase-sell-asset-card.container';
import { PurchaseSellFinishBoodySheetContainer } from '../components/purchase-sell-finish-boody-sheet/purchase-sell-finish-boody-sheet.container';
import { useNavigate } from 'react-router-dom';
import { PurchaseSellFooterContainer } from '../components/purchase-sell-footer/purchase-sell-footer.container';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

interface PurchasePageProps {
    onBuy: () => void;
    showBottomSheet: boolean;
    isShowBottomSheetFinishBoody: boolean;
    setShowBottomSheet: (x: boolean) => void;
    isLoading: boolean;
}

const PurchasePage = injectable(
    PurchaseSellContentCardContainer,
    BottomSheetPurchaseBodyContainer,
    PurchaseSellDetailsContainer,
    PurchaseSellAssetCardContainer,
    PurchaseSellFinishBoodySheetContainer,
    PurchaseSellFooterContainer,
    token('i18n')<I18NService>(),
    (
        PurchaseSellContentCardContainer,
        BottomSheetBodyContainer,
        PurchaseSellDetailsContainer,
        PurchaseSellAssetCardContainer,
        PurchaseSellFinishBoodySheetContainer,
        PurchaseSellFooterContainer,
        i18n
    ) =>
        ({
            showBottomSheet,
            setShowBottomSheet,
            isShowBottomSheetFinishBoody,
            onBuy,
            isLoading,
        }: PurchasePageProps) => {
            const navigator = useNavigate();
            const handleToggleBottomSheet = () => {
                setShowBottomSheet(!showBottomSheet);
            };
            const eventBuilder = useTWAEvent();
            const { Purchase } = useProperty(i18n.WhatToBuy);

            return (
                <div className={css.page}>
                    <div className="app-container">
                        <PurchaseSellTitle title={Purchase.title} />
                        <div className={css.assetCard}>
                            <PurchaseSellAssetCardContainer
                                type={'BUY'}
                                eventType="BUY_SELL_PAGE: fund click"
                            />
                        </div>
                        <PurchaseSellAttention {...Purchase.attention} />
                    </div>
                    <PurchaseSellContentCardContainer type={'BUY'} />

                    <PurchaseSellDetailsContainer
                        className={css.details}
                        {...Purchase.details}
                    />

                    <PurchaseSellFooterContainer
                        title={Purchase.buy}
                        onClick={() => {
                            onBuy();
                            trackTelemetree(
                                eventBuilder,
                                'BUY_SELL_PAGE: buy/sell click'
                            );
                        }}
                        isLoading={isLoading}
                    />

                    <BottomSheet
                        open={showBottomSheet}
                        hasButtonClose={true}
                        onClose={handleToggleBottomSheet}
                    >
                        <div className={css.bottomSheetTitle}>Select asset</div>
                        <div className={css.assetList}>
                            <BottomSheetBodyContainer eventType="BUY_SELL_PAGE: asset click" />
                        </div>
                    </BottomSheet>

                    <BottomSheet
                        open={isShowBottomSheetFinishBoody}
                        hasButtonClose={true}
                        onClose={() => navigator('')}
                    >
                        <PurchaseSellFinishBoodySheetContainer
                            type={'BUY'}
                            texts={Purchase.finalBottomSheet}
                        />
                    </BottomSheet>
                </div>
            );
        }
);

export default PurchasePage;
