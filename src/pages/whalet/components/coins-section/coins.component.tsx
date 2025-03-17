import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import css from './coins.module.css';
import { memo, Suspense, useEffect, useState } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';
import React from 'react';
import { newWhatToBuyViewModel } from '../../wallet.view-model';
import { TrackedEvents, trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { Loader } from '@/components/loader/loader.component';
import { I18NService } from '@/store/i18n/i18.store';

interface OperationsNavProps {
    isTransactionAvailible: boolean;
    assets: string;
    funds: string;
    transactions: string;
}

export const OperationsNav = memo(
    ({
        isTransactionAvailible,
        assets,
        funds,
        transactions,
    }: OperationsNavProps) => {
        const routesInit = [
            {
                id: 0,
                to: '/',
                title: 'Assets',
                isActive: true,
            },
            {
                id: 1,
                to: 'funds',
                title: 'Funds',
                isActive: false,
            },
            {
                id: 2,
                to: 'transactions',
                title: 'Transactions',
                isActive: false,
            },
        ];

        const mapTittle = (to: '/' | 'funds' | 'transactions') => {
            switch (to) {
                case '/':
                    return assets;
                case 'funds':
                    return funds;
                case 'transactions':
                    return transactions;
            }
        };

        const eventBuilder = useTWAEvent();

        const [routes, setRoutes] = useState(() => routesInit);
        useEffect(() => {
            const activeRoute = window.location.href.split('#')[1] ?? '';

            setRoutes((route) =>
                route.map((r) => ({ ...r, isActive: r.to === activeRoute }))
            );
        }, []);

        return (
            <div className={css.wrap}>
                <div className={css.navLinks}>
                    {routes
                        .filter((route) => {
                            if (route.id === 2) {
                                return isTransactionAvailible;
                            } else {
                                return true;
                            }
                        })
                        .map((route) => (
                            <NavLink
                                className={cn(css.link, {
                                    [css.active]: route.isActive,
                                })}
                                to={route.to}
                                key={route.id}
                                onClick={() => {
                                    trackTelemetree(
                                        eventBuilder,
                                        `WALLET_PAGE_${route.title.toUpperCase()}: ${route.title} button click` as TrackedEvents
                                    );
                                    setRoutes((r) =>
                                        r
                                            .map((t) => ({
                                                ...t,
                                                isActive: false,
                                            }))
                                            .map((t) => {
                                                if (t.id === route.id) {
                                                    return {
                                                        ...t,
                                                        isActive: true,
                                                    };
                                                } else return t;
                                            })
                                    );
                                }}
                            >
                                {
                                    // @ts-ignore
                                    mapTittle(route.to)
                                }
                            </NavLink>
                        ))}
                </div>
                <Suspense fallback={<Loader size={'small'} />}>
                    <Outlet />
                </Suspense>
            </div>
        );
    }
);

export const OperationsNavContainer = injectable(
    newWhatToBuyViewModel,
    token('i18n')<I18NService>(),

    (newWhatToBuyViewModel, i18n) => () => {
        const vm = useValueWithEffect(() => newWhatToBuyViewModel(), []);
        const isTransactionAvailible = useProperty(vm.isTransactionAvailible);
        const texts = useProperty(i18n.Wallet);
        console.log(texts);

        return React.createElement(OperationsNav, {
            isTransactionAvailible,
            ...texts.operations,
        });
    }
);
