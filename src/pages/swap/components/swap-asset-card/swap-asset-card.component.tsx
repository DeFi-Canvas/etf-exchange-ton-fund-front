import css from './swap-asset-card.module.css';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import cn from 'classnames';
import { ChevronRightIcon, WalletIcon } from '@/components/Icons/Icons.tsx';
import React, { useEffect, useState } from 'react';

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
    const textSwapCard = isFirstCard ? 'You send' : 'You receive';
    const price = `${card.availablePrice} ${card.assetName}`;

    const [swapResult, setSwapResult] = useState(0);
    const [swapResultText, setSwapResultText] = useState('≈ $ 0');

    useEffect(() => {
        setSwapResultText(`≈ $ ${swapResult.toFixed(2)}`);
    }, [swapResult]);

    const onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const valueNumber = Number(value);
        // TODO: Тут должен быть примерное отображение в долларах для текущей введённой суммы ассета
        setSwapResult(valueNumber / 2);
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
            <div className={css.approximateCurrency}>{swapResultText}</div>
        </div>
    );
};
