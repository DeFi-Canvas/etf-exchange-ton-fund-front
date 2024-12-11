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

const TabItem = (props: TabItemProps) => {
    return (
        <React.Fragment>
            <div
                onClick={() => props.onSelectTab(props.index)}
                className={cn(css.tabLink, {
                    [css.tabLinkActive]: props.activeTab === props.index,
                })}
            >
                {props.tab.title}
            </div>
            {props.lastTabIndex !== props.index && (
                <div className={css.separator} />
            )}
        </React.Fragment>
    );
};

export default TabItem;
