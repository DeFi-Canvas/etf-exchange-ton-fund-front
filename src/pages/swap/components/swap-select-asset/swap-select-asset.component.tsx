import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component.tsx';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { getUuid } from '@/utils/uuid.ts';
import css from './swap-select-asset.module.css';
import { AppInputField } from '@/components/app-input-field/app-input-field.component.tsx';
import { useState } from 'react';

interface SwapSelectAssetProps {
    isOpen: boolean;
    closeBottomSheet: () => void;
    onSelectAsset: (assetId: string) => void;
}

// MOCK
const defaultAssetList = [
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

export const SwapSelectAsset = ({
    isOpen,
    closeBottomSheet,
    onSelectAsset,
}: SwapSelectAssetProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [assetsList, setAssetsList] = useState(defaultAssetList);

    // onChange из поля ввода
    const onSearchAssets = (value: string) => {
        setSearchValue(value);

        // Фильтруем изначальный список по вхождению строки из поля поиска
        const newAssetList = defaultAssetList.filter((asset) => {
            return asset.subTitle.toLowerCase().includes(value);
        });
        setAssetsList(newAssetList);
    };

    return (
        <div>
            <BottomSheet open={isOpen} onClose={closeBottomSheet}>
                <h2>Select asset</h2>
                <AppInputField
                    value={searchValue}
                    className={css.inputField}
                    onChange={onSearchAssets}
                />
                <div className={css.assetsList}>
                    {/*
                        TODO: Сюда бы по хорошему в будущем вркутить виртуал скролл,
                            а фильтрацию через бек делать возможно или же хранить в кеше
                    */}
                    {assetsList.map((asset) => (
                        <AssetsCard
                            key={asset.id}
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
