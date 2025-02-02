import css from './swap-asset-card.module.css';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import cn from 'classnames';
import { ChevronRightIcon, WalletIcon } from '@/components/Icons/Icons.tsx';
import React from 'react';
import { formatNumberToUI } from '@/utils/number';

export interface SwapAssetCardProps {
    card: SwapAsset;
    isFirstCard?: boolean;
    className?: string;
    onArrowClick: (id: string) => void;
    onChangeField: (id: string, value: number) => void;
    onMaxClick: () => void;
}

export const SwapAssetCard = ({
    card,
    isFirstCard = false,
    className = '',
    onArrowClick,
    onChangeField,
    onMaxClick,
}: SwapAssetCardProps) => {
    const textSwapCard = isFirstCard ? 'You send' : 'You receive';
    const price = `${formatNumberToUI(card.balanceInWalet)} ${card.assetName}`;

    const onChangeFieldEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const valueNumber = Number(value);
        onChangeField(card.id, valueNumber);
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
                    {isFirstCard && (
                        <div
                            className={css.headerPriceButtonMax}
                            onClick={onMaxClick}
                        >
                            MAX
                        </div>
                    )}
                </div>
            </header>
            <div className={css.content}>
                <div
                    className={css.coinInfo}
                    onClick={() => onArrowClick(card.id)}
                >
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
                        onChange={onChangeFieldEvent}
                        value={
                            card.currentValue && card.currentValue > 0
                                ? card.currentValue
                                : ''
                        }
                    />
                </div>
            </div>
            <div className={css.approximateCurrency}>
                {card.valueInStableCoin}
            </div>
        </div>
    );
};
