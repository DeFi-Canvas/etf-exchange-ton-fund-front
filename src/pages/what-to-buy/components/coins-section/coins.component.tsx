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
];

export const Coins = () => {
    const [routes, serRoutes] = useState(routesInit);

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
                            serRoutes((r) =>
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
                {/* <NavLink
                    to="/"
                    className={cn(css.link, {
                        [css.active]: getActiveRoute('#'),
                    })}
                >
                    Assets
                </NavLink>
                <div className={css.separete} />
                <NavLink
                    to="funds"
                    className={cn(css.link, {
                        [css.active]: getActiveRoute('#funds'),
                    })}
                >
                    Funds
                </NavLink> */}

                {/* <div className={css.separete} /> */}
                {/* <NavLink
                    to="what-to-buy/transactions"
                    className={cn(css.link, {
                        [css.active]: getActiveRoute('transactions'),
                    })}
                >
                    Transactions
                </NavLink> */}
            </div>
            <Outlet />
        </div>
    );
};
