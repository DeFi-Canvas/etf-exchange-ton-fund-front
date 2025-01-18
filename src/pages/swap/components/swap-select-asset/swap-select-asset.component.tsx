import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component.tsx';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { getUuid } from '@/utils/uuid.ts';
import css from './swap-select-asset.module.css';

interface SwapSelectAssetProps {
    isOpen: boolean;
    closeBottomSheet: () => void;
    onSelectAsset: (assetId: string) => void;
}

export const SwapSelectAsset = ({
    isOpen,
    closeBottomSheet,
    onSelectAsset,
}: SwapSelectAssetProps) => {
    const assetsList = [
        {
            id: getUuid(),
            img: 'temp-usdt-coin.png',
            title: '1 253,03 USD₮',
            subTitle: 'Tether USD₮',
            price: '$ 277,89',
            priceText: '',
        },
        {
            id: getUuid(),
            img: 'temp-ton.png',
            title: '649,92 TON',
            subTitle: 'Toncoin',
            price: '$ 1 277,54',
            priceText: '',
        },
        {
            id: getUuid(),
            img: 'temp-not-coin.png',
            title: '120 592,03 NOT',
            subTitle: 'Notcoin',
            price: '$ 442,05',
            priceText: '',
        },
    ];

    return (
        <div>
            <BottomSheet open={isOpen} onClose={closeBottomSheet}>
                <h2>Select asset</h2>
                <input type="text" />

                <div className={css.assetsList}>
                    {assetsList.map((asset) => (
                        <AssetsCard
                            key={getUuid()}
                            id={asset.id}
                            img={asset.img}
                            title={asset.title}
                            subTitle={asset.subTitle}
                            price={asset.price}
                            priceText={asset.priceText}
                            onClick={() => onSelectAsset(asset.id)}
                        />
                    ))}
                </div>
            </BottomSheet>
        </div>
    );
};
