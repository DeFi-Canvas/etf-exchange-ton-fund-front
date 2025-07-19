import React from 'react';
import css from './swap-card-list.module.css';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import cn from 'classnames';
import { ArrowDownIcon, ArrowSwapIcon } from '@/components/Icons/Icons.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { SwipeDelete } from '@/components/swipe-delete/swipe-delete.component.tsx';
import { injectable } from '@injectable-ts/core';
import { SwapAssetCardContainer } from '../swap-asset-card/swap-card.container';

export interface SwapCardListProps {
    cards: SwapAsset[];
    isSingle: boolean;
    onAddAsset: () => void;
    className?: string;
    onDelete: (cardId: string) => void;
    swapButtonClick: () => void;
}

export const SwapCardList = injectable(
    SwapAssetCardContainer,
    (SwapAssetCardContainer) =>
        ({
            cards,
            isSingle,
            onAddAsset,
            className = '',
            onDelete,
            swapButtonClick,
        }: SwapCardListProps) => {
            const firstCard = cards[0];
            const otherCard = cards.slice(1);

            return (
                <div className={cn(css.swapCard, className)}>
                    <SwapAssetCardContainer
                        card={firstCard}
                        isFirstCard={true}
                        className={cn(css.card, css.cardBordered)}
                    />
                    <div
                        className={css.swapButton}
                        onClick={() => isSingle && swapButtonClick()}
                    >
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
                            <React.Fragment key={card.id}>
                                {index !== 0 && (
                                    <div className={css.cardSeparator}></div>
                                )}
                                {/* Если вторая и более карточек - то все они являются удаляемыми */}
                                {index > 0 ? (
                                    <SwipeDelete
                                        id={card.id}
                                        onDelete={onDelete}
                                    >
                                        <SwapAssetCardContainer
                                            card={card}
                                            className={css.card}
                                        />
                                    </SwipeDelete>
                                ) : (
                                    <SwapAssetCardContainer
                                        card={card}
                                        className={css.card}
                                    />
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
        }
);
