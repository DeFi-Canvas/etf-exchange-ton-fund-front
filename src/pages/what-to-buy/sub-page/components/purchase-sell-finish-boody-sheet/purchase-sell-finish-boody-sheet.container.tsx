import { injectable, token } from '@injectable-ts/core';
import { useProperty } from '@frp-ts/react';
import { PurchaseSellStore } from '../../purchase/purchase.store';
import { PurchaseSellFinishBoodySheet } from './purchase-sell-finish-boody-sheet.component';
import * as O from 'fp-ts/Option';
import { PageType } from '@/pages/what-to-buy/what-to-buy.model';
import { pipe } from 'fp-ts/lib/function';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';

interface PurchaseSellFinishBoodySheetContainerProps {
    type?: PageType;
}

export const PurchaseSellFinishBoodySheetContainer = injectable(
    token('purchaseStore')<PurchaseSellStore>(),
    (store) =>
        ({ type: typePage }: PurchaseSellFinishBoodySheetContainerProps) => {
            const fundData = useProperty(store.fundData);

            const totalAmount = pipe(
                useProperty(store.totalAmount),
                O.getOrElse(() => ({ currency: 0, coin: 0 }))
            );

            const quantity = useProperty(store.quantity);
            const type = typePage ?? 'SELL';

            return (
                <RenderResult
                    data={fundData}
                    success={({ cost, ...rest }) => (
                        <PurchaseSellFinishBoodySheet
                            {...rest}
                            value={cost}
                            totalAmount={totalAmount.currency}
                            quantity={quantity}
                            type={type}
                        />
                    )}
                />
            );
        }
);
