import cn from 'classnames';
import css from './swap.module.css';
import { Tabs } from '@/components/ui-kit/tabs/tabs.component.tsx';
import { TabItemInterface } from '@/components/ui-kit/tabs/tabs.model.ts';
import { useState } from 'react';
import { Chip } from '@/components/chip/chip.component.tsx';
import { ReloadIcon } from '@/components/Icons/Icons.tsx';

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

export const SwapPage = () => {
    const [currentTab, setCurrentTab] = useState('singleSwap');
    const onChangeTab = (selectedTab: TabItemInterface) => {
        setCurrentTab(selectedTab.name);
    };

    return (
        <div className={cn('app-container', css.page)}>
            <header className={css.header}>
                <h2 className="h2">Swap</h2>
                <Chip text="0% fee" className={css.headerChip} />
                <button className={css.buttonIcon}>
                    {/* TODO:V Доделать радиальный градиент */}
                    <ReloadIcon />
                </button>
            </header>
            <Tabs tabs={tabs} className={css.tabs} onChangeTab={onChangeTab} />
            {currentTab === 'singleSwap' && <div>Single</div>}
            {currentTab === 'multiSwap' && <div>Multi</div>}
        </div>
    );
};
