import TabBarItem from '@/components/TabBar/TabBarItem.tsx';
import {
    HomeIcon,
    ProfileIcon,
    WhatToBuyIcon,
} from '@/components/Icons/Icons.tsx';
import { useLocation } from 'react-router-dom';
import css from './tab-bar.module.css';
import cn from 'classnames';

const TabBar = () => {
    const { pathname } = useLocation();

    const renderTabBar = () => {
        //TOD: доделать стили
        return (
            <>
                <TabBarItem text={'Home'} to={'/'}>
                    <HomeIcon
                        isActive={pathname === '/' || pathname === '/assets'}
                    />
                </TabBarItem>
                <TabBarItem text={'What to buy'} to={'/what-to-buy'}>
                    <WhatToBuyIcon isActive={pathname === '/what-to-buy'} />
                </TabBarItem>
                <TabBarItem text={'Profile'} to={'/profile'}>
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
