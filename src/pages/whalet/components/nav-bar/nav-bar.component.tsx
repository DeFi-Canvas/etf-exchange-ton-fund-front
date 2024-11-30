import {
    DepositAnaliticsIcon,
    DepositDepositIcon,
    DepositFeaturedIcon,
    DepositSwapIcon,
} from '@/components/Icons/Icons';
import css from './nav-bar.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ReactNode } from 'react';

interface NavItem {
    id: number;
    href: string;
    isDisabled: boolean;
    title: string;
    icon: ReactNode;
}

// TODO  доделать на ссылки
export const NavBar = () => {
    const navMenu: NavItem[] = [
        {
            id: 1,
            href: 'deposit',
            isDisabled: false,
            title: 'Deposit',
            icon: <DepositDepositIcon />,
        },
        {
            id: 2,
            href: 'swap',
            isDisabled: true,
            title: 'Swap',
            icon: <DepositSwapIcon />,
        },
        {
            id: 3,
            href: '',
            isDisabled: true,
            title: 'Analytics',
            icon: <DepositAnaliticsIcon />,
        },
        {
            id: 4,
            href: '',
            isDisabled: true,
            title: 'Featured',
            icon: <DepositFeaturedIcon />,
        },
    ];

    return (
        <div className={cn('app-container', css.navBar)}>
            {navMenu.map((navItem) => {
                if (navItem.isDisabled) {
                    return (
                        <div
                            key={navItem.id}
                            className={cn(css.navItemCard, {
                                [css.navItemCardDisabled]: navItem.isDisabled,
                            })}
                        >
                            <div>{navItem.icon}</div>
                            <span className={css.navItemTitle}>
                                {navItem.title}
                            </span>
                        </div>
                    );
                }

                return (
                    <NavLink
                        to={navItem.href}
                        key={navItem.id}
                        className={css.navItemCard}
                    >
                        <div>{navItem.icon}</div>
                        <span className={css.navItemTitle}>
                            {navItem.title}
                        </span>
                    </NavLink>
                );
            })}
        </div>
    );
};
