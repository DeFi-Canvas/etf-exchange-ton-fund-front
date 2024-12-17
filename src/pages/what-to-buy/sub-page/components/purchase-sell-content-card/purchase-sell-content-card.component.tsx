import cn from 'classnames';
import PurchaseSellAssetCard from '../purchase-sell-asset-card/purchase-sell-asset-card.component';
import { InterfacePurchaseSellAssetCardData } from '../../types';
import css from './purchase-sell-content-card.module.css';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { TotalAmount } from '../../purchase/purchase.view-model';
import { pipe } from 'fp-ts/lib/function';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellFieldCounterContainer } from '../purchase-sell-field-counter/purchase-sell-field-counter.container';
import { Asset } from '@/pages/whalet/whalet.model';
import { WalletIcon } from '@/components/Icons/Icons.tsx';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';

interface PurchaseSellContentCardProps {
    assetCardData: E.Either<string, InterfacePurchaseSellAssetCardData>;
    totalAmount: O.Option<TotalAmount>;
    onClick: () => void;
    asset: E.Either<string, Asset>;
    maxAvailable: number;
    onMaxAvailableClick: () => void;
}
const PurchaseSellContentCard = injectable(
    PurchaseSellFieldCounterContainer,
    (PurchaseSellFieldCounterContainer) =>
        ({
            assetCardData,
            totalAmount,
            onClick,
            asset,
            maxAvailable,
            onMaxAvailableClick,
        }: PurchaseSellContentCardProps) => {
            // TODO: Какая то шляпа
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
                            <div className={css.cardTitle}>Asset</div>
                            <RenderResult
                                data={assetCardData}
                                loading={() => <SkeletonCard type={'small'} />}
                                success={(assetCardData) => (
                                    <PurchaseSellAssetCard
                                        {...assetCardData}
                                        onClick={onClick}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.section}>
                            <header className={css.cardTitle}>
                                <span>Amount ($)</span>

                                <div className={css.availablePrice}>
                                    <div className={css.maxAvailable}>
                                        <WalletIcon />
                                        {`$ ${maxAvailable?.toFixed(2)}`}
                                    </div>
                                    <div
                                        className={css.cardTitleMaxValue}
                                        onClick={onMaxAvailableClick}
                                    >
                                        MAX
                                    </div>
                                </div>
                            </header>
                            <PurchaseSellFieldCounterContainer />
                            <RenderResult
                                data={asset}
                                success={({ name }) => (
                                    <div className={css.currentTotalAmount}>
                                        ≈ {currentTotalAmount.coin.toFixed(2)}{' '}
                                        {name}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            );
        }
);

export default PurchaseSellContentCard;
