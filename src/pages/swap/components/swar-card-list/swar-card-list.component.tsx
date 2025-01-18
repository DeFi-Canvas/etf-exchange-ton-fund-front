import React from 'react';
import css from './swar-card-list.module.css';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import cn from 'classnames';
import { getUuid } from '@/utils/uuid.ts';
import { ArrowDownIcon, ArrowSwapIcon } from '@/components/Icons/Icons.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { SwapAssetCard } from '@pages/swap/components/swap-asset-card/swap-asset-card.component.tsx';
import { SwipeDelete } from '@/components/swipe-delete/swipe-delete.component.tsx';

interface SwapCardListProps {
    cards: SwapAsset[];
    isSingle: boolean;
    onAddAsset: () => void;
    className?: string;
    onDelete: (cardId: number) => void;
}

export const SwapCardList = ({
    cards,
    isSingle,
    onAddAsset,
    className = '',
    onDelete,
}: SwapCardListProps) => {
    const firstCard = cards[0];
    const otherCard = cards.slice(1);

    return (
        <div className={cn(css.swapCard, className)}>
            <SwapAssetCard
                card={firstCard}
                isFirstCard={true}
                className={cn(css.card, css.cardBordered)}
            />
            <div className={css.swapButton}>
                <div
                    className={cn(css.swapButtonSlide, {
                        [css.swapButtonSlideSingle]: isSingle,
                    })}
                >
                    <ArrowDownIcon className={css.icon} />
                    <ArrowSwapIcon className={css.icon} />
                </div>
            </div>
            <div className={css.cardList}>
                {otherCard.map((card, index) => (
                    <React.Fragment key={getUuid()}>
                        {index !== 0 && (
                            <div className={css.cardSeparator}></div>
                        )}
                        {/* Если вторая и более карточек - то все они являются удаляемыми */}
                        {index > 0 ? (
                            <SwipeDelete id={card.id} onDelete={onDelete}>
                                <SwapAssetCard
                                    card={card}
                                    className={css.card}
                                />
                            </SwipeDelete>
                        ) : (
                            <SwapAssetCard card={card} className={css.card} />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <AppButton
                label="+ Add asset"
                type="secondary"
                className={cn(css.buttonAddAsset, {
                    [css.buttonAddAssetHide]: isSingle,
                })}
                onClick={onAddAsset}
            />
        </div>
    );
};
