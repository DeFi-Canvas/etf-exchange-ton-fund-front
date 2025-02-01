import {
    DepositAnaliticsIcon,
    DepositDepositIcon,
    AIBubbleIcon,
    ArrowSwapIcon,
    DepositSwapIcon,
} from '@/components/Icons/Icons';
import css from './nav-bar.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ReactNode } from 'react';
import { trackMixpanel } from '@/mixpanel/mixpanel-entry';
import { WalletPageEvent } from '@/mixpanel/track-events';

interface NavItem {
    href: string;
    isDisabled: boolean;
    title: string;
    icon: ReactNode;
}

const navMenu: NavItem[] = [
    {
        href: 'deposit',
        isDisabled: false,
        title: 'Deposit',
        icon: <DepositDepositIcon />,
    },
    {
        href: 'swap',
        isDisabled: false,
        title: 'Swap',
        icon: <DepositSwapIcon />,
    },
    {
        href: '',
        isDisabled: true,
        title: 'Portfolio',
        icon: <DepositAnaliticsIcon />,
    },
    {
        href: '',
        isDisabled: true,
        title: 'Assistant',
        icon: <AIBubbleIcon />,
    },
];
// TODO  доделать на ссылки
export const NavBar = () => {
    return (
        <div className={cn('app-container', css.navBar)}>
            {navMenu.map((navItem, index) => {
                if (navItem.isDisabled) {
                    return (
                        <div
                            key={index}
                            className={cn(css.navItemCard, {
                                [css.navItemCardDisabled]: navItem.isDisabled,
                            })}
                            onClick={() => {
                                trackMixpanel(
                                    `WALLET_PAGE: ${navItem.title.toUpperCase()} click` as WalletPageEvent
                                );
                            }}
                            onTouchStart={() => {
                                trackMixpanel(
                                    `WALLET_PAGE: ${navItem.title.toUpperCase()} click` as WalletPageEvent
                                );
                            }}
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
                        className={css.navItemCard}
                        key={index}
                        onClick={() => {
                            trackMixpanel(
                                `WALLET_PAGE: ${navItem.title.toUpperCase()} click` as WalletPageEvent,
                                {},
                                true
                            );
                        }}
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
