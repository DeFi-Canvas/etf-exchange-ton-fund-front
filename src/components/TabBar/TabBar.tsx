import TabBarItem from '@/components/TabBar/TabBarItem.tsx';
import {
    HomeIcon,
    ProfileIcon,
    WhatToBuyIcon,
} from '@/components/Icons/Icons.tsx';
import { useLocation } from 'react-router-dom';
import css from './tab-bar.module.css';
import cn from 'classnames';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

const TabBar = () => {
    const { pathname } = useLocation();
    const eventBuilder = useTWAEvent();

    const renderTabBar = () => {
        return (
            <>
                <TabBarItem
                    text={'Home'}
                    to={'/'}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'MAIN_NAV_BAR: move home page'
                        );
                    }}
                >
                    <HomeIcon
                        isActive={pathname === '/' || pathname === '/assets'}
                    />
                </TabBarItem>
                <TabBarItem
                    text={'What to buy'}
                    to={'/what-to-buy'}
                    isAvailable={false}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'MAIN_NAV_BAR: move wtb page'
                        );
                    }}
                >
                    <WhatToBuyIcon isActive={pathname === '/what-to-buy'} />
                </TabBarItem>
                <TabBarItem
                    text={'Profile'}
                    to={'/profile'}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'MAIN_NAV_BAR: move profile page'
                        );
                    }}
                >
                    <ProfileIcon
                        className={cn(css['profile-icon'], {
                            [css['profile-active']]: pathname === '/profile',
                        })}
                    />
                </TabBarItem>
            </>
        );
    };

    return (
        <nav className={css.tabBar}>
            <div className={css.wrapper}>{renderTabBar()}</div>
        </nav>
    );
};

export default TabBar;
