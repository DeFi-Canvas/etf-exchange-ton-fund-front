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
import AmountFieldComponent from '@withdrow/sub-page/ammount/amount-field/amount-field.component.tsx';
import { DeleteIcon } from '@/components/Icons/Icons.tsx';

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

export const StrategyAssetsInside = () => {
    const [assetsIsShown, setAssetsIsShown] = useState(false);
    const [currentTab, setCurrentTab] = useState('coins');
    const [assetsList, setAssetsList] = useState(defaultAssetList);
    const [selectAssetIsShown, setSelectAssetIsShown] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState('0');
    const [amountValue, setAmountValue] = useState('0');

    const assetTabs = [
        { title: 'Coins', name: 'coins' },
        { title: 'Pools', name: 'pools' },
        { title: 'Staking', name: 'staking' },
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

    return (
        <div className={css.page}>
            <header className="app-container">
                <h2 className="h2">Assets inside</h2>
                <p className={cn('body-m-regular', 'mt-1')}>
                    Fill the Strategy with assettes so that the total volume of
                    assettes is 100%
                </p>
            </header>
            <div className={css.body}>
                {/* TODO: Добавить диаграмму */}
                <p>Круговая диаграмма</p>
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
                    <AmountFieldComponent
                        value={amountValue}
                        handleChange={() => {}}
                        currency={'%'}
                        isError={false}
                    />
                    <div>{100 - Number(amountValue)}% left</div>
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
