import {
    DepositAnaliticsIcon,
    DepositDepositIcon,
    AIBubbleIcon,
    ArrowSwapIcon,
    DepositSwapIcon,
} from '@/components/Icons/Icons';
import css from './nav-bar.module.css';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ReactNode } from 'react';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { WalletPageEvent } from '@/telemetree/track-events';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

interface NavItem {
    href: string;
    isDisabled: boolean;
    title: string;
    icon: ReactNode;
    isExternal: boolean;
}

const navMenu: NavItem[] = [
    {
        href: 'deposit',
        isDisabled: false,
        title: 'Deposit',
        icon: <DepositDepositIcon />,
        isExternal: false,
    },
    {
        href: 'swap',
        isDisabled: false,
        title: 'Swap',
        icon: <DepositSwapIcon />,
        isExternal: false,
    },
    {
        href: 'https://t.me/deficanvastest_bot',
        isDisabled: false,
        title: 'Assistant',
        icon: <AIBubbleIcon />,
        isExternal: true,
    },
    {
        href: '',
        isDisabled: true,
        title: 'Portfolio',
        icon: <DepositAnaliticsIcon />,
        isExternal: false,
    },
];
// TODO  доделать на ссылки
export const NavBar = () => {
    const eventBuilder = useTWAEvent();

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
                                trackTelemetree(
                                    eventBuilder,
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

                // if (navItem.isExternal) {
                //     return (
                //         <Link
                //             to={navItem.href}
                //             className={css.navItemCard}
                //             key={index}
                //             target="_blank"
                //             onClick={() => {
                //                 trackMixpanel(
                //                     `WALLET_PAGE: ${navItem.title.toUpperCase()} click` as WalletPageEvent,
                //                     {},
                //                     true
                //                 );
                //             }}
                //         >
                //             <div>{navItem.icon}</div>
                //             <span className={css.navItemTitle}>
                //                 {navItem.title}
                //             </span>
                //         </Link>
                //     );
                // }

                return (
                    <NavLink
                        to={navItem.href}
                        className={css.navItemCard}
                        key={index}
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                `WALLET_PAGE: ${navItem.title.toUpperCase()} click` as WalletPageEvent
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
