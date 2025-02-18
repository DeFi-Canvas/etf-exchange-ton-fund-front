import css from './strategy-preview.module.css';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import cn from 'classnames';
import { ChartCircle } from '@/components/chart-circle/chart-circle.component.tsx';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { RiskIcon } from '@/components/Icons/Icons.tsx';

// MOCK
const defaultAssetList = [
    {
        id: '1',
        img: 'temp-usdt-coin.png',
        title: '1 253,03 USD₮',
        subTitle: 'Tether USD₮',
        price: '',
        priceText: '',
    },
    {
        id: '2',
        img: 'temp-ton.png',
        title: '649,92 TON',
        subTitle: 'Toncoin',
        price: '',
        priceText: '',
    },
    {
        id: '3',
        img: 'temp-not-coin.png',
        title: '120 592,03 NOT',
        subTitle: 'Notcoin',
        price: '',
        priceText: '',
    },
];

const enum assetCategoryName {
    COINS = 'Coins',
    POOLS = 'Pools',
    STAKING = 'Staking',
}

export const StrategyPreview = () => {
    const chartInfoFilled = 70;
    const chartInfoRemain = 100 - chartInfoFilled;

    const assetInsideList = [
        {
            id: 0,
            title: assetCategoryName.COINS,
            className: css.pointCoins,
            value: '54%',
            assetList: defaultAssetList,
        },
        {
            id: 1,
            title: assetCategoryName.POOLS,
            className: css.pointPools,
            value: '22%',
            assetList: defaultAssetList,
        },
        {
            id: 2,
            title: assetCategoryName.STAKING,
            className: css.pointStalking,
            value: '24%',
            assetList: defaultAssetList,
        },
    ];

    const fundFeesList = [
        {
            id: 0,
            title: 'Defi Canvas expense ratio',
            value: '0,5%',
        },
        {
            id: 1,
            title: "Author's expense ratio ",
            value: '3%',
        },
        {
            id: 2,
            title: "Author's profit fee",
            value: '1%',
        },
    ];

    return (
        <div className={css.page}>
            <header className={'app-container'}>
                <h2 className="h2">Strategy preview</h2>
                <p className="body-m-regular color-text-dark-70 mt-1">
                    Look at the strategy preview, check all items and edit them
                    if necessary.
                </p>
            </header>
            <div className={cn('app-container', css.cardList)}>
                <div className={cn(css.card, css.cardImageName)}>
                    <img
                        src="temp-strategy-cover.png"
                        className={css.fundImage}
                    />
                    <h3 className="subhead-m">
                        Alpha Capital: Long-Term Investments
                    </h3>
                </div>
                <div className={css.card}>
                    <h3 className="subhead-m">About</h3>
                    <p className="mt-4 body-l-regular color-text-dark-70">
                        A DeFi Strategy is a decentralized financial investment
                        vehicle built on blockchain technology. It enables users
                        to pool capital and invest in a range of decentralized
                        finance (DeFi) protocols, earning returns through yield
                        farming, liquidity provision, staking, and other
                        innovative mechanisms. The Strategy operates without
                        intermediaries, offering transparency, security, and
                        global accessibility.
                    </p>
                </div>
                <div className={css.card}>
                    <h3 className="subhead-m">What&#39;s inside</h3>
                    <div className={cn(css.fundChart, 'mt-4')}>
                        <ChartCircle className={css.chart} />
                        <div className={css.chartInfo}>
                            <div className="h1">{`${chartInfoFilled}%`}</div>
                            <div className="body-m-medium color-text-dark-50">{`${chartInfoRemain}% left`}</div>
                        </div>
                    </div>
                    <div className={css.wrapperAssetList}>
                        {assetInsideList.map((insideItem) => {
                            return (
                                <div
                                    key={insideItem.id}
                                    className={css.insideItem}
                                >
                                    <header className={css.insideItemHeader}>
                                        <div
                                            className={
                                                css.insideItemHeaderTitle
                                            }
                                        >
                                            <div
                                                className={cn(
                                                    css.point,
                                                    insideItem.className
                                                )}
                                            ></div>
                                            <div>{insideItem.title}</div>
                                        </div>
                                        <div>{insideItem.value}</div>
                                    </header>
                                    {insideItem.assetList.map((assetItem) => {
                                        return (
                                            <AssetsCard
                                                key={assetItem.id}
                                                id={assetItem.id}
                                                img={assetItem.img}
                                                title={assetItem.title}
                                                subTitle={assetItem.subTitle}
                                                price={assetItem.price}
                                                priceText={assetItem.priceText}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                    <div className={css.fundChartInfoRisk}>
                        <div className={css.fundChartInfoRiskIcon}>
                            <RiskIcon />
                        </div>
                        <div className={css.fundChartInfoRiskText}>
                            <p className="body-l-medium">High risk</p>
                            <p className="body-s-regular color-text-dark-50">
                                Based on the analysis of AI assistant
                            </p>
                        </div>
                    </div>
                </div>
                <div className={css.card}>
                    <h3 className="subhead-m">Fees</h3>
                    <div className={css.fundFeesList}>
                        {fundFeesList.map((feeItem) => {
                            return (
                                <div className={css.fundFeesItem}>
                                    <p className="body-m-regular color-text-dark-70">
                                        {feeItem.title}
                                    </p>
                                    <p className="body-l-medium">
                                        {feeItem.value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={css.card}>
                    <h3 className="subhead-m">Author</h3>

                    <div className={css.fundAuthorCard}>
                        <img
                            src="temp-author.png"
                            className={css.fundAuthorCardImage}
                        />
                        <div className={css.fundAuthorCardText}>
                            <p className="body-m-medium">Kirill Kolesnikov</p>
                            <p className="body-s-regular color-text-dark-50">
                                Investing since 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter className={css.footer}>
                <AppButton
                    label="Edit"
                    type="secondary"
                    to={'/strategy/basics'}
                />
                <AppButton label="Save" to={'/strategy'} />
            </AppFooter>
        </div>
    );
};
