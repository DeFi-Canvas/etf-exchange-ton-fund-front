// Templates
import PurchaseSellTitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellFooter from '../components/purchase-sell-footer/purchase-sell-footer.component';
// Style
import css from './sell.module.css';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellDetailsContainer } from '../components/purchase-sell-details/purchase-sell-details.container';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { PurchaseSellAssetCardContainer } from '../components/purchase-sell-asset-card/purchase-sell-asset-card.container';
import { PurchaseSellFinishBoodySheetContainer } from '../components/purchase-sell-finish-boody-sheet/purchase-sell-finish-boody-sheet.container';
import { useNavigate } from 'react-router-dom';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

interface SellPageProps {
    showBottomSheet: boolean;
    onSell: () => void;
    isLoading: boolean;
}

const SellPage = injectable(
    PurchaseSellContentCardContainer,
    PurchaseSellDetailsContainer,
    PurchaseSellAssetCardContainer,
    PurchaseSellFinishBoodySheetContainer,
    token('i18n')<I18NService>(),

    (
        PurchaseSellContentCardContainer,
        PurchaseSellDetailsContainer,
        PurchaseSellAssetCardContainer,
        PurchaseSellFinishBoodySheetContainer,
        i18n
    ) =>
        ({ showBottomSheet, onSell, isLoading }: SellPageProps) => {
            const navigation = useNavigate();
            const handleToggleBottomSheet = () => {
                navigation('/');
            };
            const eventBuilder = useTWAEvent();
            const { Sell } = useProperty(i18n.WhatToBuy);

            return (
                <div className={css.page}>
                    <div className="app-container">
                        <PurchaseSellTitle title={Sell.title} />
                        <div className={css.assetCard}>
                            <PurchaseSellAssetCardContainer
                                type={'BUY'}
                                eventType="BUY_SELL_PAGE: fund click"
                            />
                        </div>
                    </div>
                    <PurchaseSellContentCardContainer type={'SELL'} />
                    <PurchaseSellDetailsContainer
                        className={css.details}
                        {...Sell.details}
                    />
                    <PurchaseSellFooter
                        title="Sell"
                        onClick={() => {
                            onSell();
                            trackTelemetree(
                                eventBuilder,
                                'BUY_SELL_PAGE: buy/sell click'
                            );
                        }}
                        isLoading={isLoading}
                        isDisabled={false}
                    />

                    <BottomSheet
                        open={showBottomSheet}
                        hasButtonClose={true}
                        onClose={handleToggleBottomSheet}
                    >
                        <PurchaseSellFinishBoodySheetContainer
                            texts={Sell.finalBottomSheet}
                        />
                    </BottomSheet>
                </div>
            );
        }
);

export default SellPage;
