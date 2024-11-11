import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';
import css from './coins.module.css';
import { useState } from 'react';

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

export const Coins = () => {
    //TODO: занести это в сервис сетингс
    const [routes, setRoutes] = useState(routesInit);

    return (
        <div className={css.wrap}>
            <div className={css.navLinks}>
                {routes.map((route) => (
                    <NavLink
                        className={cn(css.link, {
                            [css.active]: route.isActive,
                        })}
                        to={route.to}
                        key={route.id}
                        onClick={() => {
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
