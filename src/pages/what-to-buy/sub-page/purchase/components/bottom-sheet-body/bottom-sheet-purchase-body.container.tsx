import { injectable, token } from '@injectable-ts/core';
import { BottomSheetBody } from './bottom-sheet-body';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../purchase.view-model';
import { mapAssetToUICard } from '@/pages/what-to-buy/what-to-buy.model';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';

export const BottomSheetPurchaseBodyContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) => () => {
        const assets = useProperty(store.assets);

        return (
            <RenderResult
                data={assets}
                success={(assets) => (
                    <BottomSheetBody
                        data={assets.map((asset) =>
                            mapAssetToUICard(asset, false)
                        )}
                    />
                )}
            />
        );
    }
);
