import cn from 'classnames';
import css from './swap.module.css';
// import { Tabs } from '@/components/ui-kit/tabs/tabs.component.tsx';
// import { TabItemInterface } from '@/components/ui-kit/tabs/tabs.model.ts';
import { memo, useState } from 'react';
import { SwapAsset } from '@pages/swap/swap.model.ts';
import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { injectable } from '@injectable-ts/core';
import { SwapCardListContainer } from './components/swap-card-list/swap-card-list.container';
import { SwapSelectAssetContainer } from './components/swap-select-asset/swap-select-asset.container';
import { SwapHeaderContainer } from './components/swap-header/swap-header.container';
import { SwapDropdownContainer } from './components/swap-dropdown/swap-dropdown.container';
import { SwapResultContainer } from './components/swap-result/swap-result.container';
import { SwapFooterContainer } from './components/footer/swap-footer.container';
import { SkeletonCardSection } from '@/components/skeletons/skeleton-card/skeleton-card-section.component';
import { Error } from '@/store/errors/error-system';

// const tabs: TabItemInterface[] = [
//     {
//         title: 'Single Swap',
//         name: 'singleSwap',
//     },
//     {
//         title: 'Multi Swap',
//         name: 'multiSwap',
//     },
// ];

interface SwapPageProps {
    swapAssets: E.Either<Error, Array<SwapAsset>>;
}

export const SwapPage = injectable(
    SwapCardListContainer,
    SwapSelectAssetContainer,
    SwapHeaderContainer,
    SwapDropdownContainer,
    SwapResultContainer,
    SwapFooterContainer,
    (
        SwapCardListContainer,
        SwapSelectAssetContainer,
        SwapHeaderContainer,
        SwapDropdownContainer,
        SwapResultContainer,
        SwapFooterContainer
    ) =>
        memo(({ swapAssets }: SwapPageProps) => {
            // const [currentTab, setCurrentTab] = useState('singleSwap');
            const [isSingle, setIsSingle] = useState(true);
            console.log(swapAssets);

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
                    <RenderResult
                        data={swapAssets}
                        loading={() => (
                            // TODO: сделать подходящий скелетон
                            <SkeletonCardSection count={2} type={'medium'} />
                        )}
                        success={(swapAssets) => (
                            <SwapCardListContainer
                                cards={swapAssets}
                                isSingle={isSingle}
                                className={css.swapCard}
                            />
                        )}
                    />
                    <SwapFooterContainer />
                    <SwapDropdownContainer />
                    <SwapResultContainer />
                    <SwapSelectAssetContainer />
                </div>
            );
        })
);
