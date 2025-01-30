import cn from 'classnames';
import css from './swap.module.css';
import { Tabs } from '@/components/ui-kit/tabs/tabs.component.tsx';
import { TabItemInterface } from '@/components/ui-kit/tabs/tabs.model.ts';
import { useEffect, useMemo, useState } from 'react';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { SwapDropdown } from '@pages/swap/components/swap-dropdown/swap-dropdown.component.tsx';
import { DropdownOptions } from '@/components/dropdown/dropdown.component.tsx';
import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { injectable } from '@injectable-ts/core';
import { SwarCardListContainer } from './components/swap-card-list/swap-card-list.container';
import { SwapSelectAssetContainer } from './components/swap-select-asset/swap-select-asset.container';
import { SwapHeaderContainer } from './components/swap-header/swap-header.container';

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
    swapAssets: E.Either<string, Array<SwapAsset>>;
    emmitSwap: () => void;
}

export const SwapPage = injectable(
    SwarCardListContainer,
    SwapSelectAssetContainer,
    SwapHeaderContainer,
    (SwarCardListContainer, SwapSelectAssetContainer, SwapHeaderContainer) =>
        ({ emmitSwap, swapAssets }: SwapPageProps) => {
            const [currentTab, setCurrentTab] = useState('singleSwap');
            const [isSingle, setIsSingle] = useState(true);
            // const [swapCards, setSwapCards] = useState<SwapAsset[]>([]);
            // const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
            // const closeBottomSheet = () => setIsOpenBottomSheet(false);

            const onChangeTab = (selectedTab: TabItemInterface) => {
                setCurrentTab(selectedTab.name);
            };

            const SwapTabsMemo = useMemo(
                () => (
                    <Tabs
                        tabs={tabs}
                        className={css.tabs}
                        onChangeTab={onChangeTab}
                    />
                ),
                []
            );

            useEffect(() => {
                setIsSingle(currentTab === 'singleSwap');
            }, [currentTab]);

            // useEffect(() => {
            //     if (isSingle) {
            //         setSwapCards([]);
            //     }
            // }, [isSingle]);

            // const onDeleteAsset = (cardId: string) => {
            //     const newSwapCards = swapCards.filter((card) => {
            //         return card.id !== cardId;
            //     });

            //     setSwapCards(newSwapCards);
            // };

            return (
                <div className={cn('app-container', css.page)}>
                    <SwapHeaderContainer />
                    {SwapTabsMemo}
                    {/* TODO: скелетон */}
                    <RenderResult
                        data={swapAssets}
                        success={(swapAssets) => (
                            <SwarCardListContainer
                                cards={swapAssets}
                                isSingle={isSingle}
                                className={css.swapCard}
                                // onDelete={onDeleteAsset}
                            />
                        )}
                    />
                    <SwapDropdown options={OPTIONS_MOCK} />
                    <AppFooter>
                        <AppButton
                            label="Swap"
                            isDisabled={false}
                            onClick={emmitSwap}
                        />
                    </AppFooter>
                    <SwapSelectAssetContainer />
                </div>
            );
        }
);
