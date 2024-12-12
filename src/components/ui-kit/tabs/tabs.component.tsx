import { useState } from 'react';
import css from './tabs.module.css';
import { TabSlider } from './components/tab-slider/tab-slider.component';
import { TabItem } from './components/tab-item/tab-item.component.tsx';
import { TabItemInterface } from './tabs.model.ts';

interface TabsProps {
    tabs: TabItemInterface[];
    onChangeTab: (currentTab: TabItemInterface) => void;
}

export const Tabs = ({ tabs, onChangeTab }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const totalTabsCount = tabs.length;
    const lastTabIndex = totalTabsCount - 1;

    const onSelectTab = (index: number) => {
        setActiveTab(index);
        onChangeTab(tabs[index]);
    };

    return (
        <div className={css.tabList}>
            {tabs.map((tab, index) => (
                <TabItem
                    key={`${tab.name}-${index}`}
                    activeTab={activeTab}
                    index={index}
                    lastTabIndex={lastTabIndex}
                    tab={tab}
                    onSelectTab={onSelectTab}
                />
            ))}
            <TabSlider
                totalTabsCount={totalTabsCount}
                lastTabIndex={lastTabIndex}
                activeTab={activeTab}
            />
        </div>
    );
};
