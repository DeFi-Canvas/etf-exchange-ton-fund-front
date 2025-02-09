import { injectable, token } from '@injectable-ts/core';
import { useProperty } from '@frp-ts/react';
import {
    isAssetAvailible,
    mapFundToUICard,
    PageType,
} from '@/pages/what-to-buy/what-to-buy.model';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import PurchaseSellAssetCard from './purchase-sell-asset-card.component';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import { trackTelemetree, TrackedEvents } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

interface PurchaseSellAssetCardContainerProps {
    type: PageType;
    eventType: TrackedEvents;
}

export const PurchaseSellAssetCardContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) =>
        ({ type, eventType }: PurchaseSellAssetCardContainerProps) => {
            const fund = useProperty(store.fundData);
            const eventBuilder = useTWAEvent();

            return (
                <RenderResult
                    data={fund}
                    loading={() => <SkeletonCard type={'small'} />}
                    success={(fund) => {
                        const props = mapFundToUICard(
                            fund,
                            !isAssetAvailible(type)
                        );
                        return (
                            <PurchaseSellAssetCard
                                {...props}
                                isBackgroundWhite={true}
                                onClick={() => {
                                    store.setIsBottomPanel(
                                        !isAssetAvailible(type)
                                    );
                                    trackTelemetree(eventBuilder, eventType);
                                }}
                            />
                        );
                    }}
                />
            );
        }
);
