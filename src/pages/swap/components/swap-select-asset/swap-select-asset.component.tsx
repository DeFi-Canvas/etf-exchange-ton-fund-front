import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component.tsx';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import css from './swap-select-asset.module.css';
import { AppInputField } from '@/components/app-input-field/app-input-field.component.tsx';
import { useState } from 'react';
import { Assets } from '@/components/assets-card/assets-card.model';
import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { constVoid } from 'fp-ts/lib/function';

export interface SwapSelectAssetProps {
    isOpen: boolean;
    closeBottomSheet: () => void;
    onSelectAsset: (assetId: string) => void;
    avlailibleAssets: E.Either<string, Assets[]>;
}

export const SwapSelectAsset = ({
    isOpen,
    closeBottomSheet,
    onSelectAsset,
    avlailibleAssets,
}: SwapSelectAssetProps) => {
    const [searchValue, setSearchValue] = useState('');

    // onChange из поля ввода
    // const onSearchAssets = (value: string) => {
    //     setSearchValue(value);

    //     // Фильтруем изначальный список по вхождению строки из поля поиска
    //     const newAssetList = defaultAssetList.filter((asset) => {
    //         return asset.subTitle.toLowerCase().includes(value);
    //     });
    //     setAssetsList(newAssetList);
    // };

    return (
        <div>
            <BottomSheet open={isOpen} onClose={closeBottomSheet}>
                <h2>Select asset</h2>
                <AppInputField
                    value={searchValue}
                    className={css.inputField}
                    // onChange={onSearchAssets}
                    onChange={constVoid}
                    placeholder="Serch"
                />
                <div className={css.assetsList}>
                    {/*
                        TODO: Сюда бы по хорошему в будущем вркутить виртуал скролл,
                            а фильтрацию через бек делать возможно или же хранить в кеше
                    */}
                    <RenderResult
                        data={avlailibleAssets}
                        success={(assetsList) => (
                            <>
                                {assetsList.map((asset) => (
                                    <AssetsCard
                                        key={asset.id}
                                        {...asset}
                                        onClick={() => onSelectAsset(asset.id)}
                                    />
                                ))}
                            </>
                        )}
                    />
                </div>
            </BottomSheet>
        </div>
    );
};
