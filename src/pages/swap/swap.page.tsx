import cn from 'classnames';
import css from './swap.module.css';
import { Tabs } from '@/components/ui-kit/tabs/tabs.component.tsx';
import { TabItemInterface } from '@/components/ui-kit/tabs/tabs.model.ts';
import { useEffect, useMemo, useState } from 'react';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { injectable } from '@injectable-ts/core';
import { SwapCardListContainer } from './components/swap-card-list/swap-card-list.container';
import { SwapSelectAssetContainer } from './components/swap-select-asset/swap-select-asset.container';
import { SwapHeaderContainer } from './components/swap-header/swap-header.container';
import { SwapDropdownContainer } from './components/swap-dropdown/swap-dropdown.container';
import { SwapResultContainer } from './components/swap-result/swap-result.container';

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

interface SwapPageProps {
    swapAssets: E.Either<string, Array<SwapAsset>>;
    emmitSwap: () => void;
}

export const SwapPage = injectable(
    SwapCardListContainer,
    SwapSelectAssetContainer,
    SwapHeaderContainer,
    SwapDropdownContainer,
    SwapResultContainer,
    (
        SwapCardListContainer,
        SwapSelectAssetContainer,
        SwapHeaderContainer,
        SwapDropdownContainer,
        SwapResultContainer
    ) =>
        ({ emmitSwap, swapAssets }: SwapPageProps) => {
            // const [currentTab, setCurrentTab] = useState('singleSwap');
            const [isSingle, setIsSingle] = useState(true);

            // const onChangeTab = (selectedTab: TabItemInterface) => {
            //     setCurrentTab(selectedTab.name);
            // };

            // const SwapTabsMemo = useMemo(
            //     () => (
            //         <Tabs
            //             tabs={tabs}
            //             className={css.tabs}
            //             onChangeTab={onChangeTab}
            //         />
            //     ),
            //     []
            // );

            // useEffect(() => {
            //     setIsSingle(currentTab === 'singleSwap');
            // }, [currentTab]);

            return (
                <div className={cn('app-container', css.page)}>
                    <SwapHeaderContainer />
                    {/* TODO: соленье на будующее */}
                    {/* {SwapTabsMemo} */}
                    {/* TODO: скелетон */}
                    <RenderResult
                        data={swapAssets}
                        success={(swapAssets) => (
                            <SwapCardListContainer
                                cards={swapAssets}
                                isSingle={isSingle}
                                className={css.swapCard}
                            />
                        )}
                    />
                    <SwapDropdownContainer />
                    <AppFooter>
                        <AppButton
                            label="Swap"
                            isDisabled={false}
                            onClick={emmitSwap}
                        />
                    </AppFooter>
                    <SwapSelectAssetContainer />
                    <SwapResultContainer />
                </div>
            );
        }
);
