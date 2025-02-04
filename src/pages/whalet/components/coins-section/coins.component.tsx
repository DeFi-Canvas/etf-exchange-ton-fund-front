import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';
import css from './coins.module.css';
import { useState } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useProperty } from '@frp-ts/react';
import { injectable } from '@injectable-ts/core';
import React from 'react';
import { newWhatToBuyViewModel } from '../../whalet.view-model';
import { TrackedEvents, trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

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
interface OperationsNavProps {
    isTransactionAvailible: boolean;
}

export const OperationsNav = ({
    isTransactionAvailible,
}: OperationsNavProps) => {
    const eventBuilder = useTWAEvent();
    //TODO: занести это в сервис сетингс
    const [routes, setRoutes] = useState(routesInit);

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
                                        .map((t) => ({ ...t, isActive: false }))
                                        .map((t) => {
                                            if (t.id === route.id) {
                                                return { ...t, isActive: true };
                                            } else return t;
                                        })
                                );
                            }}
                        >
                            {route.title}
                        </NavLink>
                    ))}
            </div>
            <Outlet />
        </div>
    );
};

export const OperationsNavContainer = injectable(
    newWhatToBuyViewModel,
    (newWhatToBuyViewModel) => () => {
        const vm = useValueWithEffect(() => newWhatToBuyViewModel(), []);
        const isTransactionAvailible = useProperty(vm.isTransactionAvailible);
        return React.createElement(OperationsNav, { isTransactionAvailible });
    }
);
