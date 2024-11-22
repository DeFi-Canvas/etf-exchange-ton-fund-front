// Templates
import PurchaseSellIitle from '../components/purchase-sell-title/purchase-sell-title.component';
import PurchaseSellFooter from '../components/purchase-sell-footer/purchase-sell-footer.component';
// Types
// Style
import css from './sell.module.css';
import { PurchaseSellContentCardContainer } from '../components/purchase-sell-content-card/purchase-sell-content-card.container';
import { injectable } from '@injectable-ts/core';
import { PurchaseSellDetailsContainer } from '../components/purchase-sell-details/purchase-sell-details.container';
import { BottomSheetSellBodyContainer } from '../purchase/components/bottom-sheet-body/bottom-sheet-sell-body.container';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { PurchaseSellAssetCardContainer } from '../components/purchase-sell-asset-card/purchase-sell-asset-card.container';

interface SellPageProps {
    showBottomSheet: boolean;
    setShowBottomSheet: (x: boolean) => void;
}

const SellPage = injectable(
    PurchaseSellContentCardContainer,
    PurchaseSellDetailsContainer,
    BottomSheetSellBodyContainer,
    PurchaseSellAssetCardContainer,
    (
        PurchaseSellContentCardContainer,
        PurchaseSellDetailsContainer,
        BottomSheetSellBodyContainer,
        PurchaseSellAssetCardContainer
    ) =>
        ({ showBottomSheet, setShowBottomSheet }: SellPageProps) => {
            // TODO:V Моки для (<PurchaseSellAssetCard />)
            // const assetCardData: InterfacePurchaseSellAssetCardData = {
            //     imageSrc: './temp-asset-card-avatar.png', // TODO:V Лежит в root/public
            //     title: 'Canvas stable',
            //     subTitle: 'Defi Canvas',
            //     price: '$ 5,42',
            //     allowedOpen: true,
            //     isBackgroundWhite: true,
            // };
            const handleToggleBottomSheet = () => {
                setShowBottomSheet(!showBottomSheet);
            };
            return (
                <div className={css.page}>
                    <div className="app-container">
                        <PurchaseSellIitle title="Sell" />
                        <div className={css.assetCard}>
                            <PurchaseSellAssetCardContainer type={'SELL'} />
                        </div>
                    </div>
                    <PurchaseSellContentCardContainer type={'SELL'} />
                    <PurchaseSellDetailsContainer
                        className={css.details}
                        title="Sell Details"
                    />
                    <PurchaseSellFooter title="Sell" onClick={() => {}} />

                    <BottomSheet
                        open={showBottomSheet}
                        hasButtonClose={true}
                        onClose={handleToggleBottomSheet}
                    >
                        {/* TODO: Это всё мок, нужно заменить */}
                        <div className={css.bottomSheetContent}>
                            <header className={css.bottomSheetHeader}>
                                <img
                                    className={css.bottomSheetImage}
                                    src="https://etf-exchange.s3.eu-north-1.amazonaws.com/fund-backgrounds/Stablecoin+Yield+Fund.jpg"
                                />
                                <div className={css.bottomSheetTitle}>
                                    The sale is successful
                                </div>
                                <div className={css.bottomSheetSubTitle}>
                                    «Canvas Stable» fund sale
                                </div>
                            </header>
                            <div className={css.bottomSheetInfoList}>
                                <div className={css.bottomSheetInfoItem}>
                                    <span
                                        className={css.bottomSheetInfoItemTitle}
                                    >
                                        Value
                                    </span>
                                    <span>$ 5,42</span>
                                </div>
                                <div className={css.bottomSheetInfoItem}>
                                    <span
                                        className={css.bottomSheetInfoItemTitle}
                                    >
                                        Quantity
                                    </span>
                                    <span>5</span>
                                </div>
                                <div className={css.bottomSheetInfoItem}>
                                    <span
                                        className={css.bottomSheetInfoItemTitle}
                                    >
                                        Total amount
                                    </span>
                                    <span>$ 25,39</span>
                                </div>
                            </div>
                        </div>
                    </BottomSheet>
                </div>
            );
        }
);

export default SellPage;
