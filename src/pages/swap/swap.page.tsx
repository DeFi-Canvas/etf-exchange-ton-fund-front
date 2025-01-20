import cn from 'classnames';
import css from './swap.module.css';
import { Tabs } from '@/components/ui-kit/tabs/tabs.component.tsx';
import { TabItemInterface } from '@/components/ui-kit/tabs/tabs.model.ts';
import { useEffect, useMemo, useState } from 'react';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import { SwapCardList } from '@pages/swap/components/swar-card-list/swar-card-list.component.tsx';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { SwapDropdown } from '@pages/swap/components/swap-dropdown/swap-dropdown.component.tsx';
import { DropdownOptions } from '@/components/dropdown/dropdown.component.tsx';
import { SwapHeader } from '@pages/swap/components/swap-header/swap-header.component.tsx';
import { SwapSelectAsset } from '@pages/swap/components/swap-select-asset/swap-select-asset.component.tsx';

const tabs: TabItemInterface[] = [
    {
        title: 'Single Swap',
        name: 'singleSwap',
    },
    {
        title: 'Multi Swap',
        name: 'multiSwap',
    },
];

const SWAP_CARDS_DEFAULT: SwapAsset[] = [
    {
        id: 1,
        imageSrc: 'temp-ton.png',
        assetName: 'TON',
        availablePrice: 93.92,
    },
    {
        id: 2,
        imageSrc: 'temp-usdt-coin.png',
        assetName: 'USD₮',
        availablePrice: 1545.95,
    },
];

// TODO: MOCK
const OPTIONS_MOCK: DropdownOptions[] = [
    {
        name: 'Exchange rate',
        value: ['1 TON ≈ 5,485 USD₮'],
    },
    { name: 'Minimum received', value: ['11,88 USD₮'] },
    { name: 'TON balance after swap', value: ['98,64 TON'] },
    { name: 'USD₮ balance after swap', value: ['5,482 USD₮'] },
];

interface SwapPageProps {
    emmitSwipe: () => void;
}

export const SwapPage = ({ emmitSwipe }: SwapPageProps) => {
    const [currentTab, setCurrentTab] = useState('singleSwap');
    const [isSingle, setIsSingle] = useState(true);
    const [isDisabledSwap, setIsDisabledSwap] = useState(true);
    const [swapCards, setSwapCards] = useState<SwapAsset[]>(SWAP_CARDS_DEFAULT);
    const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
    const closeBottomSheet = () => setIsOpenBottomSheet(false);
    const openBottomSheet = () => setIsOpenBottomSheet(true);
    const onSelectAsset = (assetId: string) => {
        console.log(assetId);
        closeBottomSheet();
    };

    const onChangeTab = (selectedTab: TabItemInterface) => {
        setCurrentTab(selectedTab.name);
    };

    const onAddAsset = () => {
        const newSwapCard: SwapAsset = {
            id: 3,
            imageSrc: 'temp-btc-coin.png',
            assetName: 'BTC',
            availablePrice: 193.92,
        };
        setSwapCards((cards) => [...cards, newSwapCard]);
    };

    const SwapTabsMemo = useMemo(
        () => (
            <Tabs tabs={tabs} className={css.tabs} onChangeTab={onChangeTab} />
        ),
        []
    );

    useEffect(() => {
        setIsSingle(currentTab === 'singleSwap');
    }, [currentTab]);

    useEffect(() => {
        if (isSingle) {
            setSwapCards(SWAP_CARDS_DEFAULT);
        }
    }, [isSingle]);

    const onDeleteAsset = (cardId: number) => {
        const newSwapCards = swapCards.filter((card) => {
            return card.id !== cardId;
        });

        setSwapCards(newSwapCards);
    };

    return (
        <div className={cn('app-container', css.page)}>
            <button onClick={emmitSwipe}>OPEN</button>
            <SwapHeader />
            {SwapTabsMemo}
            <SwapCardList
                cards={swapCards}
                isSingle={isSingle}
                className={css.swapCard}
                onAddAsset={onAddAsset}
                onDelete={onDeleteAsset}
            />
            <SwapDropdown options={OPTIONS_MOCK} />
            <AppFooter>
                <AppButton label="Swap" to={'/swap'} isDisabled={false} />
            </AppFooter>
            <SwapSelectAsset
                isOpen={isOpenBottomSheet}
                closeBottomSheet={closeBottomSheet}
                onSelectAsset={onSelectAsset}
            />
        </div>
    );
};
