import {
    DepositAnaliticsIcon,
    DepositDepositIcon,
    DepositFeaturedIcon,
    DepositSwapIcon,
} from '@/components/Icons/Icons';
import css from './nav-bar.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

// TODO  доделать на ссылки
export const NavBar = () => {
    return (
        <div className={cn('app-container', css.wrap)}>
            <NavLink to={'deposit'} className={css.link}>
                <div>
                    <DepositDepositIcon />
                </div>
                <span className={css.title}>Deposit</span>
            </NavLink>
            <NavLink to={'swap'} className={css.link}>
                <div>
                    <DepositSwapIcon />
                </div>
                <span className={css.title}>Swap</span>
            </NavLink>
            <div className={css.link}>
                <div>
                    <DepositAnaliticsIcon />
                </div>
                <span className={css.title}>Analytics</span>
            </div>
            <div className={css.link}>
                <div>
                    <DepositFeaturedIcon />
                </div>
                <span className={css.title}>Featured</span>
            </div>
        </div>
    );
};
