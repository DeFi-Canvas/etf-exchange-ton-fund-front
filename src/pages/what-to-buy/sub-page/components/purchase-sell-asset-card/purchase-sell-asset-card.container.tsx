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
import { trackMixpanel, TrackMixpanelEvents } from '@/mixpanel/mixpanel-entry';

interface PurchaseSellAssetCardContainerProps {
    type: PageType;
    eventType: TrackMixpanelEvents;
}

export const PurchaseSellAssetCardContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) =>
        ({ type, eventType }: PurchaseSellAssetCardContainerProps) => {
            const fund = useProperty(store.fundData);

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
                                    trackMixpanel(eventType);
                                }}
                            />
                        );
                    }}
                />
            );
        }
);
