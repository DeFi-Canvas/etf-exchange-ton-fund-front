import cn from 'classnames';
import PurchaseSellAssetCard from '../purchase-sell-asset-card/purchase-sell-asset-card.component';
import { InterfacePurchaseSellAssetCardData } from '../../types';
import css from './purchase-sell-content-card.module.css';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { TotalAmount } from '../../purchase/purchase.store';
import { pipe } from 'fp-ts/lib/function';
import { injectable, token } from '@injectable-ts/core';
import { PurchaseSellFieldCounterContainer } from '../purchase-sell-field-counter/purchase-sell-field-counter.container';
import { WalletIcon } from '@/components/Icons/Icons.tsx';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

interface PurchaseSellContentCardProps {
    assetCardData: E.Either<string, InterfacePurchaseSellAssetCardData>;
    totalAmount: O.Option<TotalAmount>;
    onClick: () => void;
    assetName: E.Either<string, string>;
    maxAvailable: number;
    onMaxAvailableClick: () => void;
}
const PurchaseSellContentCard = injectable(
    PurchaseSellFieldCounterContainer,
    token('i18n')<I18NService>(),

    (PurchaseSellFieldCounterContainer, i18n) =>
        ({
            assetCardData,
            totalAmount,
            onClick,
            assetName,
            maxAvailable,
            onMaxAvailableClick,
        }: PurchaseSellContentCardProps) => {
            const eventBuilder = useTWAEvent();
            const { utils: utilsText } = useProperty(i18n.WhatToBuy);

            // TODO: Какая то шляпа
            // возможно стоит расщипить на 2 значения и использовать напрямую
            const currentTotalAmount = pipe(
                totalAmount,
                O.getOrElse(() => ({
                    currency: 0,
                    coin: 0,
                }))
            );

            return (
                <div className={css.card}>
                    <div className={cn('app-container', css.cardContainer)}>
                        <div className={css.section}>
                            <div className={css.cardTitle}>
                                {utilsText.asset}
                            </div>
                            <RenderResult
                                data={assetCardData}
                                loading={() => <SkeletonCard type={'small'} />}
                                success={(assetCardData) => (
                                    <PurchaseSellAssetCard
                                        {...assetCardData}
                                        allowedOpen={false}
                                        onClick={() => {
                                            onClick();
                                            trackTelemetree(
                                                eventBuilder,
                                                'BUY_SELL_PAGE: assetOprions click'
                                            );
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.section}>
                            <header className={css.cardTitle}>
                                <span>{utilsText.amount} ($)</span>

                                <div className={css.availablePrice}>
                                    <div className={css.maxAvailable}>
                                        <WalletIcon />
                                        {`$ ${maxAvailable?.toFixed(2)}`}
                                    </div>
                                    <div
                                        className={css.cardTitleMaxValue}
                                        onClick={onMaxAvailableClick}
                                    >
                                        {utilsText.max}
                                    </div>
                                </div>
                            </header>
                            <PurchaseSellFieldCounterContainer />
                            <div className={css.currentTotalAmount}>
                                ≈ {currentTotalAmount.coin.toFixed(2)}{' '}
                                <RenderResult
                                    data={assetName}
                                    success={(assetName) => <>{assetName}</>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
);

export default PurchaseSellContentCard;
