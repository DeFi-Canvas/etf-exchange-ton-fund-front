import React from 'react';
import cn from 'classnames';
import css from './tab-item.module.css';
import { TabItemInterface } from '../../tabs.model.ts';

interface TabItemProps {
    activeTab: number;
    index: number;
    lastTabIndex: number;
    tab: TabItemInterface;
    onSelectTab: (index: number) => void;
}

export const TabItem = ({
    activeTab,
    index,
    lastTabIndex,
    tab,
    onSelectTab,
}: TabItemProps) => {
    return (
        <React.Fragment>
            <div
                onClick={() => onSelectTab(index)}
                className={cn(css.tabLink, {
                    [css.tabLinkActive]: activeTab === index,
                })}
            >
                {tab.title}
            </div>
            {lastTabIndex !== index && <div className={css.separator} />}
        </React.Fragment>
    );
};
