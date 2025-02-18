import css from './strategy-assets-inside.module.css';
import cn from 'classnames';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { useState } from 'react';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component.tsx';
import { Tabs } from '@/components/ui-kit/tabs/tabs.component.tsx';
import { TabItemInterface } from '@/components/ui-kit/tabs/tabs.model.ts';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { Chip } from '@/components/chip/chip.component.tsx';
import { DeleteIcon } from '@/components/Icons/Icons.tsx';
import { ChartCircle } from '@/components/chart-circle/chart-circle.component.tsx';

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

export const StrategyAssetsInside = () => {
    const [assetsIsShown, setAssetsIsShown] = useState(false);
    const [currentTab, setCurrentTab] = useState('coins');
    const [assetsList, setAssetsList] = useState(defaultAssetList);
    const [selectAssetIsShown, setSelectAssetIsShown] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState('0');
    const [amountValue, setAmountValue] = useState('0');

    const assetTabs = [
        { title: assetCategoryName.COINS, name: 'coins' },
        { title: assetCategoryName.POOLS, name: 'pools' },
        { title: assetCategoryName.STAKING, name: 'staking' },
    ];

    const openAddAssets = () => setAssetsIsShown(true);
    const closeAddAssets = () => setAssetsIsShown(false);
    const onChangeTab = (selectedTab: TabItemInterface) => {
        setCurrentTab(selectedTab.name);
    };
    const onSelectAsset = (id: string) => {
        console.log('select asset', id);
        setSelectedAssetId(id);

        openSelectAssetIsShown();
    };
    const openSelectAssetIsShown = () => setSelectAssetIsShown(true);
    const closeSelectAssetIsShown = () => setSelectAssetIsShown(false);
    const selectedAsset = () => {
        return (
            defaultAssetList.find(({ id }) => id === selectedAssetId) ??
            defaultAssetList[0]
        );
    };
    const setAmount = (value: string) => {
        if (value === 'delete') {
            setAmountValue(amountValue.slice(0, -1));
            return;
        }
        if (amountValue === '0') {
            setAmountValue(value);
            return;
        }

        if (Number(amountValue + value) <= 100) {
            setAmountValue(amountValue + value);
        }
    };

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

    return (
        <div className={css.page}>
            <header className="app-container">
                <h2 className="h2">Assets inside</h2>
                <p className="body-m-regular color-text-dark-70 mt-1">
                    Fill the Strategy with assettes so that the total volume of
                    assettes is 100%
                </p>
            </header>
            <div className={css.body}>
                <ChartCircle className={css.chart} />
                <div className={css.chartInfo}>
                    <div className="h1">{`${chartInfoFilled}%`}</div>
                    <div className="body-m-medium color-text-dark-50">{`${chartInfoRemain}% left`}</div>
                </div>
            </div>
            <div className={css.wrapperAssetList}>
                {assetInsideList.map((insideItem) => {
                    return (
                        <div key={insideItem.id} className={css.insideItem}>
                            <header className={css.insideItemHeader}>
                                <div className={css.insideItemHeaderTitle}>
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

            <BottomSheet open={assetsIsShown} onClose={closeAddAssets}>
                <p className="subhead-s">Add asset</p>
                <Tabs
                    className="mt-4"
                    tabs={assetTabs}
                    activeTabName={currentTab}
                    onChangeTab={onChangeTab}
                />
                <div className={css.assetsList}>
                    {assetsList.map((asset) => (
                        <AssetsCard
                            key={asset.id}
                            id={asset.id}
                            img={asset.img}
                            title={asset.title}
                            subTitle={asset.subTitle}
                            price={asset.price}
                            priceText={asset.priceText}
                            onClick={() => onSelectAsset(asset.id)}
                        />
                    ))}
                </div>
            </BottomSheet>
            <BottomSheet open={selectAssetIsShown} onClose={() => {}}>
                <div className={css.selectedAssetCard}>
                    <AssetsCard
                        key={selectedAsset().id}
                        id={selectedAsset().id}
                        img={selectedAsset().img}
                        title={selectedAsset().title}
                        subTitle={selectedAsset().subTitle}
                        price={selectedAsset().price}
                        priceText={selectedAsset().priceText}
                    />
                    <Chip
                        text="Cancel"
                        className={css.buttonCancelSelectedAsset}
                        onClick={closeSelectAssetIsShown}
                    />
                </div>
                <div className={css.assetFilledWrapper}>
                    <div className={cn('h1', css.amountValue)}>
                        {amountValue}
                        <span className={css.amountPercent}>%</span>
                    </div>
                    <div>{100 - Number(amountValue)}% left</div>
                </div>
                <div className={css.actions}>
                    <AppButton
                        label="Save"
                        onClick={() => closeSelectAssetIsShown()}
                    />
                </div>
                <div className={css.keyboard}>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('1')}
                    >
                        1
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('2')}
                    >
                        2
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('3')}
                    >
                        3
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('4')}
                    >
                        4
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('5')}
                    >
                        5
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('6')}
                    >
                        6
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('7')}
                    >
                        7
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('8')}
                    >
                        8
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('9')}
                    >
                        9
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount(',')}
                    >
                        ,
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('0')}
                    >
                        0
                    </button>
                    <button
                        className={css.keyboardButton}
                        onClick={() => setAmount('delete')}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </BottomSheet>
            <AppFooter>
                <AppButton label="+ Add asset" onClick={openAddAssets} />
            </AppFooter>
        </div>
    );
};
