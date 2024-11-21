import { constVoid } from 'fp-ts/lib/function';
import PurchaseSellAssetCard from '../../../components/purchase-sell-asset-card/purchase-sell-asset-card.component';
import { InterfacePurchaseSellAssetCardData } from '../../../types';

interface BottomSheetBodyProps {
    data: InterfacePurchaseSellAssetCardData[];
}

export const BottomSheetBody = ({ data }: BottomSheetBodyProps) => {
    return (
        <>
            {data.map((assetCardData) => (
                <PurchaseSellAssetCard
                    {...assetCardData}
                    key={assetCardData.title}
                    onClick={constVoid}
                />
            ))}
        </>
    );
};
