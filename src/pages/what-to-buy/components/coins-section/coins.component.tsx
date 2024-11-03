import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';
import css from './coins.module.css';

export const Coins = () => {
    const location = window.location.href;
    const getActiveRoute = (path: string) => location.split('/').includes(path);

    return (
        <div className={css.wrap}>
            <div className={css.navLinks}>
                <NavLink
                    to="assets"
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
                </NavLink>
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
