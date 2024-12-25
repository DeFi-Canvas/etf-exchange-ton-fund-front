import css from './swap-asset-card.module.css';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import cn from 'classnames';
import { ChevronRightIcon, WalletIcon } from '@/components/Icons/Icons.tsx';
import React, { useState } from 'react';

interface SwapAssetCardProps {
    card: SwapAsset;
    isFirstCard?: boolean;
    className?: string;
}

export const SwapAssetCard = ({
    card,
    isFirstCard = false,
    className = '',
}: SwapAssetCardProps) => {
    const [approximateCurrency, setApproximateCurrency] = useState(0);
    const textSwapCard = isFirstCard ? 'You send' : 'You receive';
    const price = `${card.availablePrice} ${card.assetName}`;
    const approximateCurrencyText = `≈ $ ${approximateCurrency.toFixed(2)}`;

    const onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const valueNumber = Number(value);
        setApproximateCurrency(valueNumber / 2);
    };

    return (
        <div className={cn(css.swapAssetCard, className)}>
            <header className={css.header}>
                <div className={css.headerTitle}>{textSwapCard}</div>
                <div className={css.headerInfo}>
                    <div className={css.headerPrice}>
                        <WalletIcon />
                        {price}
                    </div>
                    <div className={css.headerPriceButtonMax}>MAX</div>
                </div>
            </header>
            <div className={css.content}>
                <div className={css.coinInfo}>
                    <img
                        className={css.coinInfoImage}
                        src={card.imageSrc}
                        alt="Coin"
                    />
                    <div className={css.coinInfoSelect}>
                        <div className={css.coinInfoName}>{card.assetName}</div>
                        <div className={css.coinInfoIcon}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                </div>
                <div className={css.fieldWrapper}>
                    <input
                        type="number"
                        className={css.field}
                        placeholder="0"
                        onChange={onChangeField}
                    />
                </div>
            </div>
            <div className={css.approximateCurrency}>
                {approximateCurrencyText}
            </div>
        </div>
    );
};
